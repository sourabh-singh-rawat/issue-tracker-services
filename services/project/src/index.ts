import { DataSource } from "typeorm";
import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { ProjectController } from "./controllers/interfaces/project.controller";
import { UserService } from "./services/interfaces/user.service";
import { ProjectService } from "./services/interfaces/project.service";
import { UserRepository } from "./repositories/interfaces/user.repository";
import { WorkspaceRepository } from "./repositories/interfaces/workspace.repository";
import { ProjectRepository } from "./repositories/interfaces/project.repository";
import { ProjectMemberRepository } from "./repositories/interfaces/project-member";
import { WorkspaceMemberRepository } from "./repositories/interfaces/workspace-member.repository";
import { ProjectCreatedPublisher } from "./events/publishers/project-created.publisher";
import { ProjectUpdatedPublisher } from "./events/publishers/project-updated.publisher";
import { ProjectMemberCreatedPublisher } from "./events/publishers/project-member-created.publisher";
import { UserCreatedSubscriber } from "./events/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "./events/subscribers/user-updated.subscriber";
import { WorkspaceCreatedSubscriber } from "./events/subscribers/workspace-created.subscriber";
import { projectRoutes } from "./routes/project.routes";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { CoreProjectController } from "./controllers/core-project.controller";
import { CoreUserService } from "./services/core-user.service";
import { CoreProjectService } from "./services/core-project.service";
import { PostgresUserRepository } from "./repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "./repositories/postgres-workspace.repository";
import { PostgresProjectRepository } from "./repositories/postgres-project.repository";
import { PostgresProjectMemberRepository } from "./repositories/postgres-project-member.repository";
import { PostgresWorkspaceMemberRepository } from "./repositories/postgres-workspace-member.repository";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  orm: Typeorm;
  eventBus: EventBus;
  projectController: ProjectController;
  userService: UserService;
  projectService: ProjectService;
  userRepository: UserRepository;
  workspaceRepository: WorkspaceRepository;
  projectRepository: ProjectRepository;
  projectMemberRepository: ProjectMemberRepository;
  workspaceMemberRepository: WorkspaceMemberRepository;
  projectCreatedPublisher: ProjectCreatedPublisher;
  projectUpdatedPublisher: ProjectUpdatedPublisher;
  projectMemberCreatedPublisher: ProjectMemberCreatedPublisher;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  workspaceCreatedSubscriber: WorkspaceCreatedSubscriber;
}

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      routes: [
        {
          prefix: "/api/v1/projects",
          route: projectRoutes(container),
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
  container.get("workspaceCreatedSubscriber").fetchMessages();
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
  add("eventBus", asValue(eventBus));
  add("dataSource", asValue(dataSource));
  add("orm", asValue(orm));
  add("projectController", asClass(CoreProjectController));
  add("userService", asClass(CoreUserService));
  add("projectService", asClass(CoreProjectService));
  add("userRepository", asClass(PostgresUserRepository));
  add("workspaceRepository", asClass(PostgresWorkspaceRepository));
  add("projectRepository", asClass(PostgresProjectRepository));
  add("projectMemberRepository", asClass(PostgresProjectMemberRepository));
  add("workspaceMemberRepository", asClass(PostgresWorkspaceMemberRepository));
  add("projectCreatedPublisher", asClass(ProjectCreatedPublisher));
  add("projectUpdatedPublisher", asClass(ProjectUpdatedPublisher));
  add("projectMemberCreatedPublisher", asClass(ProjectMemberCreatedPublisher));
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add("workspaceCreatedSubscriber", asClass(WorkspaceCreatedSubscriber));
  add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));

  await container.init();

  await startServer(container);
  startSubscriptions(container);
};

main();
