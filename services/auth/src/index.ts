import "dotenv/config";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import swagger from "@fastify/swagger";
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
import { identityRoutes } from "./routes/identity.routes";
import { UserController } from "./controllers/interfaces/user.controller";
import { CoreUserController } from "./controllers/core-user.controller";
import { UserService } from "./Services/Interfaces/user.service";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { CoreUserService } from "./Services/core-user.service";
import { UserProfileRepository } from "./data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "./data/repositories/postgres-user-profile.repository";
import { userRoutes } from "./routes/user.routes";
import { UserEmailConfirmationSentSubscriber } from "./events/subscribers/user-email-confirmation-sent.subscriber";
import { EmailVerificationTokenEntity } from "./data/entities/email-verification-token.entity";
import { PostgresEmailVerificationTokenRepository as PostgresEmailVerificationTokenRepository } from "./data/repositories/postgres-email-verification-token.repository";
import { writeFile } from "fs";
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

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      configuration: {
        host: "0.0.0.0",
        port: 4001,
        environment: "development",
        version: 1,
      },
      security: {
        cors: { credentials: true, origin: "http://localhost:3000" },
        cookie: { secret: process.env.JWT_SECRET! },
      },
      routes: [
        { route: identityRoutes(container) },
        { route: userRoutes(container) },
      ],
    });

    server.instance.register(swagger, {
      openapi: {
        openapi: "3.0.0",
        info: {
          title: "Auth Service",
          version: "1.0.0",
          description: "Authentication service",
          license: {
            name: "ISC",
            url: "https://github.com/sourabh-singh-rawat/issue-tracker/blob/master/LICENSE",
          },
        },
        servers: [
          { url: "https://localhost:443", description: "development server" },
        ],
        tags: [{ name: "user", description: "User related end-points" }],
        components: {
          securitySchemes: {
            cookieAuth: { type: "apiKey", in: "cookie", name: "accessToken" },
          },
        },
        security: [],
      },
    });

    server.instance.addSchema({
      $id: "emailSchema",
      type: "string",
      minLength: 1,
      maxLength: 80,
      format: "email",
      default: "Sourabh.rawatcc@gmail.com",
      // errorMessage: "email is not allowed to be empty and should be valid",
    });

    server.init();
    await server.instance.ready();
    const files = server.instance.swagger();
    writeFile(
      "../../clients/issue-tracker/src/api/generated/auth.openapi.json",
      JSON.stringify(files),
      (err) => {
        err;
      },
    );
  } catch (error) {
    process.exit(1);
  }
};

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userEmailConfirmationSentSubscriber").fetchMessages();
};

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

const main = async () => {
  const orm = new PostgresTypeorm(dataSource, logger);
  orm.init();

  const broker = new NatsBroker({
    servers: [process.env.NATS_SERVER_URL || "nats"],
    streams: ["user"],
    logger,
  });
  await broker.init();

  const awilix = createContainer<RegisteredServices>({
    injectionMode: InjectionMode.CLASSIC,
  });
  const container = new AwilixDi<RegisteredServices>(awilix, logger);
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

  await startServer(container);
  startSubscriptions(container);
};

main();
