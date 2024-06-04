import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { IdentityController } from "./controllers/interfaces/identity-controller";
import { IdentityService } from "./services/interfaces/identity.service";
import { UserService } from "./services/interfaces/user.service";
import { UserCreatedSubscriber } from "./events/subscribers/user-created.subscribers";
import { UserUpdatedSubscriber } from "./events/subscribers/user-updated.subscribers";
import { UserRepository } from "./data/repositories/interfaces/user-repository";
import { AccessTokenRepository } from "./data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "./data/repositories/interfaces/refresh-token-repository";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { CoreUserService } from "./services/core-user.service";
import { CoreIdentityController } from "./controllers/core-identity.controller";
import { CoreIdentityService } from "./services/core-identity.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "./data/repositories/postgres-access-token.repository";
import { PostgresRefreshTokenRepository } from "./data/repositories/postgres-refresh-token.repository";
import { DataSource } from "typeorm";
import { identityRoutes } from "./routes/identity.routes";

export interface RegisteredServices {
  orm: Typeorm;
  logger: AppLogger;
  eventBus: EventBus;
  identityController: IdentityController;
  identityService: IdentityService;
  userService: UserService;
  userRepository: UserRepository;
  accessTokenRepository: AccessTokenRepository;
  refreshTokenRepository: RefreshTokenRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
}

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      routes: [
        {
          prefix: "/api/v1/identity",
          route: identityRoutes(container),
        },
      ],
    });

    server.init();
  } catch (error) {
    process.exit(1);
  }
};

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userCreatedSubscriber").fetchMessages();
  container.get("userUpdatedSubscriber").fetchMessages();
};

const main = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.host,
    username: process.env.user,
    password: process.env.password,
    database: process.env.dbname,
    entities: ["src/data/entities/*.ts"],
    synchronize: true,
  });

  const orm = new PostgresTypeorm(dataSource, logger);
  orm.init();

  const eventBus = new NatsEventBus({ servers: ["nats"] }, logger);
  await eventBus.init();

  const awilix = createContainer<RegisteredServices>({
    injectionMode: InjectionMode.CLASSIC,
  });
  const container = new AwilixDi<RegisteredServices>(awilix, logger);
  const { add } = container;
  add("orm", asValue(orm));
  add("logger", asValue(logger));
  add("eventBus", asValue(eventBus));
  add("identityController", asClass(CoreIdentityController));
  add("userService", asClass(CoreUserService));
  add("identityService", asClass(CoreIdentityService));
  add("userRepository", asClass(PostgresUserRepository));
  add("accessTokenRepository", asClass(PostgresAccessTokenRepository));
  add("refreshTokenRepository", asClass(PostgresRefreshTokenRepository));
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));

  container.init();

  await startServer(container);
  startSubscriptions(container);
};

main();
