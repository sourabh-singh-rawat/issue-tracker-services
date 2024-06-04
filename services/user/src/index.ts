import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { UserController } from "./controllers/interfaces/user.controller";
import { userRoutes } from "./routes/user.routes";
import { UserService } from "./services/interface/user.service";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { CoreUserController } from "./controllers/core-user.controller";
import { CoreUserService } from "./services/core-user.service";
import { DataSource } from "typeorm";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { UserProfileRepository } from "./data/repositories/interfaces/user-profile.repository";
import { UserCreatedPublisher } from "./events/publishers/user-created.publisher";
import { UserUpdatedPublisher } from "./events/publishers/user-updated.publisher";
import { PostgresUserProfileRepository } from "./data/repositories/postgres-user-profile.repository";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";

export interface RegisteredServices {
  logger: AppLogger;
  orm: Typeorm;
  eventBus: EventBus;
  userController: UserController;
  userService: UserService;
  userRepository: UserRepository;
  userProfileRepository: UserProfileRepository;
  userCreatedPublisher: UserCreatedPublisher;
  userUpdatedPublisher: UserUpdatedPublisher;
}

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      routes: [
        {
          prefix: "/api/v1/users",
          route: userRoutes(container),
        },
      ],
    });

    server.init();
  } catch (error) {
    process.exit(1);
  }
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
  add("userController", asClass(CoreUserController));
  add("userService", asClass(CoreUserService));
  add("userRepository", asClass(PostgresUserRepository));
  add("userProfileRepository", asClass(PostgresUserProfileRepository));
  add("userCreatedPublisher", asClass(UserCreatedPublisher));
  add("userUpdatedPublisher", asClass(UserUpdatedPublisher));

  container.init();

  await startServer(container);
};

main();
