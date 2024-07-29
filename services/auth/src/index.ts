import "dotenv/config";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import swagger from "@fastify/swagger";
import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { IdentityController } from "./controllers/interfaces/identity.controller";
import { IdentityService } from "./services/interfaces/identity.service";
import { AccessTokenRepository } from "./data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "./data/repositories/interfaces/refresh-token-repository";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { CoreIdentityController } from "./controllers/core-identity.controller";
import { CoreIdentityService } from "./services/core-identity.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "./data/repositories/postgres-access-token.repository";
import { PostgresRefreshTokenRepository } from "./data/repositories/postgres-refresh-token.repository";
import { DataSource } from "typeorm";
import { identityRoutes } from "./routes/identity.routes";
import { UserController } from "./controllers/interfaces/user.controller";
import { CoreUserController } from "./controllers/core-user.controller";
import { UserService } from "./services/interfaces/user.service";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { CoreUserService } from "./services/core-user.service";
import { UserProfileRepository } from "./data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "./data/repositories/postgres-user-profile.repository";
import { UserRegisteredPublisher } from "./events/publishers/user-registered.publisher";
import { UserEmailVerifiedPublisher } from "./events/publishers/user-email-verified.publisher";
import { userRoutes } from "./routes/user.routes";
import { UserEmailConfirmationSentSubscriber } from "./events/subscribers/user-email-confirmation-sent.subscriber";
import { EmailVerificationTokenEntity } from "./data/entities/email-verification-token.entity";
import { PostgresEmailVerificationTokenRepository as PostgresEmailVerificationTokenRepository } from "./data/repositories/postgres-email-verification-token.repository";
import { writeFile } from "fs";

export interface RegisteredServices {
  orm: Typeorm;
  logger: AppLogger;
  eventBus: EventBus;
  identityController: IdentityController;
  userController: UserController;
  identityService: IdentityService;
  userService: UserService;
  userRepository: UserRepository;
  userProfileRepository: UserProfileRepository;
  accessTokenRepository: AccessTokenRepository;
  refreshTokenRepository: RefreshTokenRepository;
  emailVerificationTokenRepository: EmailVerificationTokenEntity;
  userRegisteredPublisher: UserRegisteredPublisher;
  userEmailVerifiedPublisher: UserEmailVerifiedPublisher;
  userEmailConfirmationSentSubscriber: UserEmailConfirmationSentSubscriber;
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

const main = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["src/data/entities/*.ts"],
    synchronize: true,
  });

  const orm = new PostgresTypeorm(dataSource, logger);
  orm.init();

  const eventBus = new NatsEventBus(
    { servers: [process.env.NATS_SERVER_URL || "nats"] },
    ["user"],
    logger,
  );
  await eventBus.init();

  const awilix = createContainer<RegisteredServices>({
    injectionMode: InjectionMode.CLASSIC,
  });
  const container = new AwilixDi<RegisteredServices>(awilix, logger);
  const { add } = container;
  add("orm", asValue(orm));
  add("logger", asValue(logger));
  add("eventBus", asValue(eventBus));
  add("userController", asClass(CoreUserController));
  add("identityController", asClass(CoreIdentityController));
  add("userService", asClass(CoreUserService));
  add("identityService", asClass(CoreIdentityService));
  add("userRepository", asClass(PostgresUserRepository));
  add("userProfileRepository", asClass(PostgresUserProfileRepository));
  add("accessTokenRepository", asClass(PostgresAccessTokenRepository));
  add("refreshTokenRepository", asClass(PostgresRefreshTokenRepository));
  add(
    "emailVerificationTokenRepository",
    asClass(PostgresEmailVerificationTokenRepository),
  );
  add("userRegisteredPublisher", asClass(UserRegisteredPublisher));
  add("userEmailVerifiedPublisher", asClass(UserEmailVerifiedPublisher));
  add(
    "userEmailConfirmationSentSubscriber",
    asClass(UserEmailConfirmationSentSubscriber),
  );

  container.init();

  await startServer(container);
  startSubscriptions(container);
};

main();
