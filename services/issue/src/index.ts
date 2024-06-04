import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { IssueController } from "./controllers/interfaces/issue-controller";
import { IssueCommentController } from "./controllers/interfaces/issue-comment.controller";
import { IssueTaskController } from "./controllers/interfaces/issue-task.controller";
import { UserService } from "./services/interfaces/user.service";
import { IssueService } from "./services/interfaces/issue.service";
import { IssueCommentService } from "./services/interfaces/issue-comment.service";
import { IssueTaskService } from "./services/interfaces/issue-task.service";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { IssueRepository } from "./data/repositories/interfaces/issue.repository";
import { ProjectRepository } from "./data/repositories/interfaces/project.repository";
import { IssueAssigneeRepository } from "./data/repositories/interfaces/issue-assignee.repository";
import { IssueCommentRepository } from "./data/repositories/interfaces/issue-comment.repository";
import { IssueTaskRepository } from "./data/repositories/interfaces/issue-task.repository";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { DataSource } from "typeorm";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { issueRoutes } from "./routes/issue.routes";
import { issueCommentRoutes } from "./routes/issue-comment.routes";
import { issueTaskRoutes } from "./routes/issue-task.routes";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { CoreIssueController } from "./controllers/core-issue.controller";
import { CoreIssueCommentController } from "./controllers/core-issue-comment.controller";
import { CoreIssueTaskController } from "./controllers/core-issue-task.controller";
import { CoreUserService } from "./services/core-user.service";
import { CoreIssueService } from "./services/core-issue.service";
import { CoreIssueCommentService } from "./services/core-issue-comment.service";
import { CoreIssueTaskService } from "./services/core-issue-task.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresIssueRepository } from "./data/repositories/postgres-issue.repository";
import { PostgresProjectRepository } from "./data/repositories/postgres-project.repository";
import { PostgresIssueAssigneeRepository } from "./data/repositories/postgres-issue-assignee.repository";
import { PostgresIssueCommentRepository } from "./data/repositories/postgres-issue-comment.repository";
import { PostgresIssueTaskRepository } from "./data/repositories/postgres-issue-task.repository";
import { UserCreatedSubscriber } from "./events/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "./events/subscribers/user-updated.subscribers";
import { ProjectCreatedSubscriber } from "./events/subscribers/project-created.subscriber";
import { IssueCreatedPublisher } from "./events/publishers/issue-created.publisher";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  orm: Typeorm;
  eventBus: EventBus;
  issueController: IssueController;
  issueCommentController: IssueCommentController;
  issueTaskController: IssueTaskController;
  userService: UserService;
  issueService: IssueService;
  issueCommentService: IssueCommentService;
  issueTaskService: IssueTaskService;
  userRepository: UserRepository;
  issueRepository: IssueRepository;
  projectRepository: ProjectRepository;
  issueAssigneeRepository: IssueAssigneeRepository;
  issueCommentRepository: IssueCommentRepository;
  issueTaskRepository: IssueTaskRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  projectCreatedSubscriber: ProjectCreatedSubscriber;
  issueCreatedPublisher: IssueCreatedPublisher;
}

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      routes: [
        {
          prefix: "/api/v1/issues",
          route: issueRoutes(container),
        },
        {
          prefix: "/api/v1/issues",
          route: issueCommentRoutes(container),
        },
        {
          prefix: "/api/v1/issues",
          route: issueTaskRoutes(container),
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
  add("issueController", asClass(CoreIssueController));
  add("issueCommentController", asClass(CoreIssueCommentController));
  add("issueTaskController", asClass(CoreIssueTaskController));
  add("userService", asClass(CoreUserService));
  add("issueService", asClass(CoreIssueService));
  add("issueCommentService", asClass(CoreIssueCommentService));
  add("issueTaskService", asClass(CoreIssueTaskService));
  add("userRepository", asClass(PostgresUserRepository));
  add("issueRepository", asClass(PostgresIssueRepository));
  add("projectRepository", asClass(PostgresProjectRepository));
  add("issueAssigneeRepository", asClass(PostgresIssueAssigneeRepository));
  add("issueCommentRepository", asClass(PostgresIssueCommentRepository));
  add("issueTaskRepository", asClass(PostgresIssueTaskRepository));
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
  add("projectCreatedSubscriber", asClass(ProjectCreatedSubscriber));
  add("issueCreatedPublisher", asClass(IssueCreatedPublisher));

  container.init();

  await startServer(container);
  startSubscriptions(container);
};

main();
