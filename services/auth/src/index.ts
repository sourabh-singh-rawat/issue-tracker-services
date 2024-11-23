import "dotenv/config";
import "reflect-metadata";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import fastify from "fastify";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { IdentityController } from "./controllers/interfaces/identity.controller";
import { IdentityService } from "./Services/Interfaces/identity.service";
import { AccessTokenRepository } from "./data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "./data/repositories/interfaces/refresh-token-repository";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { CoreIdentityController } from "./controllers/core-identity.controller";
import { CoreIdentityService } from "./Services/core-identity.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "./data/repositories/postgres-access-token.repository";
import { PostgresRefreshTokenRepository } from "./data/repositories/postgres-refresh-token.repository";
import { DataSource } from "typeorm";
import { UserController } from "./controllers/interfaces/user.controller";
import { CoreUserController } from "./controllers/core-user.controller";
import { UserService } from "./Services/Interfaces/user.service";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { CoreUserService } from "./Services/core-user.service";
import { UserProfileRepository } from "./data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "./data/repositories/postgres-user-profile.repository";
import { UserEmailConfirmationSentSubscriber } from "./events/subscribers/user-email-confirmation-sent.subscriber";
import { EmailVerificationTokenEntity } from "./data/entities/email-verification-token.entity";
import { PostgresEmailVerificationTokenRepository } from "./data/repositories/postgres-email-verification-token.repository";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import {
  NatsBroker,
  NatsPublisher,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";
import {
  UserAuthenticationService,
  UserProfileService,
} from "./Services/Interfaces";
import { CoreUserAuthenticationService } from "./Services/CoreUserAuthenticationService";
import { CoreUserProfileService } from "./Services";
import { buildSchema } from "type-graphql";
import { CoreUserAuthenticationResolver } from "./resolvers";
import { ApolloServer } from "@apollo/server";
import fastifyApollo, {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import { JwtToken } from "@issue-tracker/security";

export interface RegisteredServices {
  orm: Typeorm;
  logger: AppLogger;
  publisher: Publisher<Subjects>;
  identityController: IdentityController;
  userController: UserController;
  identityService: IdentityService;
  userService: UserService;
  userRepository: UserRepository;
  userProfileRepository: UserProfileRepository;
  accessTokenRepository: AccessTokenRepository;
  refreshTokenRepository: RefreshTokenRepository;
  emailVerificationTokenRepository: EmailVerificationTokenEntity;
  userEmailConfirmationSentSubscriber: UserEmailConfirmationSentSubscriber;
  userAuthenticationService: UserAuthenticationService;
  userProfileService: UserProfileService;
}

const t = initTRPC.context<{ user: any; res: any }>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userEmailConfirmationSentSubscriber").fetchMessages();
};

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});
export const container = new AwilixDi<RegisteredServices>(awilix, logger);
const authRouter = router({
  registerUser: publicProcedure
    .input(
      z.object({
        displayName: z.string(),
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const service = container.get("userAuthenticationService");

      await dataSource.transaction(async (manager) => {
        await service.createUserWithEmailAndPassword({ ...input, manager });
      });
    }),
  getCurrentUser: publicProcedure.query(async ({ ctx }) => {
    const service = container.get("userProfileService");
    const { user } = ctx;

    return await service.getUserProfileWithEmail(user.email);
  }),
  verifyVerificationLink: publicProcedure
    .input(z.object({ confirmationEmail: z.string() }))
    .query(async ({ input, ctx }) => {
      const { confirmationEmail } = input;
      const { user } = ctx;
      const service = container.get("userAuthenticationService");

      await dataSource.transaction(async (manager) => {
        await service.verifyVerificationLink({
          manager,
          userId: user.email,
          inviteToken: confirmationEmail,
        });
      });
    }),
  signInWithEmailAndPassword: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { res } = ctx;
      await dataSource.transaction(async (manager) => {
        const service = container.get("userAuthenticationService");

        const output = await service.signInWithEmailAndPassword({
          ...input,
          manager,
        });
        const { accessToken, refreshToken } = output;

        res.setCookie("accessToken", accessToken);
        res.setCookie("refreshToken", refreshToken);
      });
    }),
});

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

const createContext: ApolloFastifyContextFunction<any> = async (req, rep) => {
  const { accessToken } = req.cookies;

  let token: any;
  if (accessToken) {
    try {
      token = JwtToken.verify(accessToken, process.env.JWT_SECRET!);
    } catch (error) {
      console.log(error);
    }
  }

  token;

  if (token) {
    return { req, rep, user: { email: token.email, userId: token.userId } };
  }

  return { req, rep };
};

const startServer = async () => {
  try {
    const schema = await buildSchema({
      emitSchemaFile: true,
      resolvers: [CoreUserAuthenticationResolver],
    });
    const instance = fastify();
    const apollo = new ApolloServer<any>({
      schema,
      plugins: [fastifyApolloDrainPlugin(instance)],
    });
    await apollo.start();

    const server = new FastifyServer({
      fastify: instance,
      configuration: {
        host: "0.0.0.0",
        port: 5000,
        environment: "development",
        version: 1,
      },
      security: {
        cors: { credentials: true, origin: "http://localhost:3000" },
        cookie: { secret: process.env.JWT_SECRET! },
      },
    });

    server.init();
    instance.route({
      url: "/graphql",
      method: ["POST", "GET"],
      handler: fastifyApolloHandler(apollo, { context: createContext }),
    });
  } catch (error) {
    process.exit(1);
  }
};

const main = async () => {
  const orm = new PostgresTypeorm(dataSource, logger);
  orm.init();

  const broker = new NatsBroker({
    servers: [process.env.NATS_SERVER_URL || "nats"],
    streams: ["user"],
    logger,
  });
  await broker.init();

  container.add("orm", asValue(orm));
  container.add("logger", asValue(logger));
  container.add("broker", asValue(broker));
  container.add("publisher", asClass(NatsPublisher));
  container.add("userController", asClass(CoreUserController));
  container.add("identityController", asClass(CoreIdentityController));
  container.add("userService", asClass(CoreUserService));
  container.add("identityService", asClass(CoreIdentityService));
  container.add("userRepository", asClass(PostgresUserRepository));
  container.add(
    "userProfileRepository",
    asClass(PostgresUserProfileRepository),
  );
  container.add(
    "accessTokenRepository",
    asClass(PostgresAccessTokenRepository),
  );
  container.add(
    "refreshTokenRepository",
    asClass(PostgresRefreshTokenRepository),
  );
  container.add(
    "userAuthenticationService",
    asClass(CoreUserAuthenticationService),
  );
  container.add(
    "emailVerificationTokenRepository",
    asClass(PostgresEmailVerificationTokenRepository),
  );
  container.add(
    "userEmailConfirmationSentSubscriber",
    asClass(UserEmailConfirmationSentSubscriber),
  );
  container.add("userProfileService", asClass(CoreUserProfileService));

  container.init();

  await startServer();
  startSubscriptions(container);
};

main();

export type AuthRouter = typeof authRouter;
