import "dotenv/config";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { IdentityController } from "./controllers/interfaces/identity.controller";
import { IdentityService } from "./services/interfaces/identity.service";
import { UserCreatedSubscriber } from "./events/subscribers/user-created.subscribers";
import { UserUpdatedSubscriber } from "./events/subscribers/user-updated.subscribers";
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
import { UserCreatedPublisher } from "./events/publishers/user-created.publisher";
import { UserUpdatedPublisher } from "./events/publishers/user-updated.publisher";
import { userRoutes } from "./routes/user.routes";

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
  userCreatedPublisher: UserCreatedPublisher;
  userUpdatedPublisher: UserUpdatedPublisher;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
}

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      port: 4001,
      routes: [
        {
          prefix: "/api/v1/auth/identity",
          route: identityRoutes(container),
        },
        {
          prefix: "/api/v1/auth/users",
          route: userRoutes(container),
        },
      ],
    });

    server.init();
  } catch (error) {
    process.exit(1);
  }
};

// const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
//   container.get("userCreatedSubscriber").fetchMessages();
//   container.get("userUpdatedSubscriber").fetchMessages();
// };

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
  add("userCreatedPublisher", asClass(UserCreatedPublisher));
  add("userUpdatedPublisher", asClass(UserUpdatedPublisher));
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));

  container.init();

  await startServer(container);
  // startSubscriptions(container);
};

main();
