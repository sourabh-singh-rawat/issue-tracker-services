import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import {
  AwilixDi,
  logger,
  AppLogger,
  FastifyServer,
} from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { IssueCreatedSubscriber } from "./events/subscribers/issue-created.subscriber";
import { ProjectUpdatedSubscriber } from "./events/subscribers/project-updated.subscriber";
import { ProjectCreatedSubscriber } from "./events/subscribers/project-created.subscriber";
import { UserUpdatedSubscriber } from "./events/subscribers/user-updated.subscriber";
import { UserCreatedSubscriber } from "./events/subscribers/user-created.subscriber";
import { IssueActivityService } from "./services/interfaces/issue-activity.service";
import { ProjectActivityService } from "./services/interfaces/project-activity.service";
import { ProjectActivityController } from "./controllers/interfaces/project-activity.controller";
import { UserService } from "./services/interfaces/user.service";
import { DataSource } from "typeorm";
import { CoreUserService } from "./services/core-user.service";
import { CoreProjectActivityService } from "./services/core-project-activity.service";
import { CoreProjectActivityController } from "./controllers/core-project-activity.controller";
import { CoreIssueActivityService } from "./services/core-issue-activity.service";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { projectActivityRoutes } from "./routes/project-activity.routes";
import { ProjectActivityRepository } from "./data/repositories/interfaces/project-activity.repository";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresProjectActivityRepository } from "./data/repositories/postgres-project-activity.repository";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  orm: Typeorm;
  eventBus: EventBus;
  userService: UserService;
  userRepository: UserRepository;
  projectActivityController: ProjectActivityController;
  projectActivityService: ProjectActivityService;
  projectActivityRepository: ProjectActivityRepository;
  issueActivityService: IssueActivityService;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  projectCreatedSubscriber: ProjectCreatedSubscriber;
  projectUpdatedSubscriber: ProjectUpdatedSubscriber;
  issueCreatedSubscriber: IssueCreatedSubscriber;
}

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      routes: [
        {
          prefix: "/api/v1/activities/projects",
          route: projectActivityRoutes(container),
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
  container.get("projectCreatedSubscriber").fetchMessages();
  container.get("projectUpdatedSubscriber").fetchMessages();
  container.get("issueCreatedSubscriber").fetchMessages();
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
  add("logger", asValue(logger));
  add("dataSource", asValue(dataSource));
  add("orm", asValue(orm));
  add("eventBus", asValue(eventBus));
  add("userService", asClass(CoreUserService));
  add("userRepository", asClass(PostgresUserRepository));
  add("projectActivityService", asClass(CoreProjectActivityService));
  add("projectActivityController", asClass(CoreProjectActivityController));
  add("projectActivityRepository", asClass(PostgresProjectActivityRepository));
  add("issueActivityService", asClass(CoreIssueActivityService));
  add("projectCreatedSubscriber", asClass(ProjectCreatedSubscriber));
  add("projectUpdatedSubscriber", asClass(ProjectUpdatedSubscriber));
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
  add("issueCreatedSubscriber", asClass(IssueCreatedSubscriber));
  await container.init();

  await startServer(container);
  startSubscriptions(container);
};

main();
