import "dotenv/config";
import "reflect-metadata";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import fastify from "fastify";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { IdentityService } from "./Services/Interfaces/identity.service";
import { AccessTokenRepository } from "./data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "./data/repositories/interfaces/refresh-token-repository";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { CoreIdentityService } from "./Services/core-identity.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "./data/repositories/postgres-access-token.repository";
import { PostgresRefreshTokenRepository } from "./data/repositories/postgres-refresh-token.repository";
import { DataSource } from "typeorm";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { UserProfileRepository } from "./data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "./data/repositories/postgres-user-profile.repository";
import { UserEmailConfirmationSentSubscriber } from "./events/subscribers/user-email-confirmation-sent.subscriber";
import { VerificationLink } from "./data/entities/VerificationLink";
import { PostgresEmailVerificationTokenRepository } from "./data/repositories/postgres-email-verification-token.repository";
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
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import { JwtToken } from "@issue-tracker/security";

export interface RegisteredServices {
  orm: Typeorm;
  logger: AppLogger;
  publisher: Publisher<Subjects>;
  identityService: IdentityService;
  userRepository: UserRepository;
  userProfileRepository: UserProfileRepository;
  accessTokenRepository: AccessTokenRepository;
  refreshTokenRepository: RefreshTokenRepository;
  emailVerificationTokenRepository: VerificationLink;
  userEmailConfirmationSentSubscriber: UserEmailConfirmationSentSubscriber;
  userAuthenticationService: UserAuthenticationService;
  userProfileService: UserProfileService;
}

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userEmailConfirmationSentSubscriber").fetchMessages();
};

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});
export const container = new AwilixDi<RegisteredServices>(awilix, logger);

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.AUTH_POSTGRES_CLUSTER_URL,
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
        port: parseInt(process.env.AUTH_SERVICE_PORT!),
        environment: "development",
        version: 1,
      },
      security: {
        cors: { credentials: true, origin: "http://localhost:3000" },
        cookie: { secret: process.env.JWT_SECRET! },
      },
    });

    await server.init();
    instance.route({
      url: "/api/graphql",
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
    servers: [process.env.NATS_CLUSTER_URL || "nats"],
    streams: ["user"],
    logger,
  });
  await broker.init();

  container.add("orm", asValue(orm));
  container.add("logger", asValue(logger));
  container.add("broker", asValue(broker));
  container.add("publisher", asClass(NatsPublisher));
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
