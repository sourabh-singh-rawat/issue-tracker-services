import "dotenv/config";
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
import { UserUpdatedSubscriber } from "./events/subscribers/user-updated.subscriber";
import { IssueCreatedPublisher } from "./events/publishers/issue-created.publisher";
import { projectRoutes } from "./routes/project.routes";
import { workspaceRoutes } from "./routes/workspace.routes";
import { ProjectController } from "./controllers/interfaces/project.controller";
import { CoreProjectController } from "./controllers/core-project.controller";
import { WorkspaceController } from "./controllers/interfaces/workspace.controller";
import { CoreWorkspaceController } from "./controllers/core-workspace.controller";
import { CoreProjectService } from "./services/core-project.service";
import { ProjectService } from "./services/interfaces/project.service";
import { WorkspaceService } from "./services/interfaces/workspace.service";
import { CoreWorkspaceService } from "./services/core-workspace.service";
import { WorkspaceRepository } from "./data/repositories/interfaces/workspace.repository";
import { PostgresWorkspaceRepository } from "./data/repositories/postgres-workspace.repository";
import { WorkspaceMemberRepository } from "./data/repositories/interfaces/workspace-member.repository";
import { PostgresWorkspaceMemberRepository } from "./data/repositories/postgres-workspace-member.repository";
import { PostgresProjectMemberRepository } from "./data/repositories/postgres-project-member.repository";
import { ProjectMemberRepository } from "./data/repositories/interfaces/project-member";
import { ProjectCreatedPublisher } from "./events/publishers/project-created.publisher";
import { WorkspaceCreatedPublisher } from "./events/publishers/workspace-created.publisher";
import { ProjectUpdatedPublisher } from "./events/publishers/project-updated.publisher";
import { WorkspaceInviteCreatedPublisher } from "./events/publishers/workspace-invite-created.publisher";
import { ProjectMemberCreatedPublisher } from "./events/publishers/project-member-created.publisher";
import { WorkspaceMemberInviteRepository } from "./data/repositories/interfaces/workspace-member-invite.repository";
import { PostgresWorkspaceMemberInviteRepository } from "./data/repositories/postgres-workspace-member-invite.repository";
import { projectActivityRoutes } from "./routes/project-activity.routes";
import { ProjectActivityController } from "./controllers/interfaces/project-activity.controller";
import { CoreProjectActivityController } from "./controllers/core-project-activity.controller";
import { CoreProjectActivityService } from "./services/core-project-activity.service";
import { ProjectActivityService } from "./services/interfaces/project-activity.service";
import { PostgresProjectActivityRepository } from "./data/repositories/postgres-project-activity.repository";
import { ProjectActivityRepository } from "./data/repositories/interfaces/project-activity.repository";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  orm: Typeorm;
  eventBus: EventBus;
  issueController: IssueController;
  issueCommentController: IssueCommentController;
  issueTaskController: IssueTaskController;
  projectController: ProjectController;
  workspaceController: WorkspaceController;
  projectActivityController: ProjectActivityController;
  userService: UserService;
  issueService: IssueService;
  projectService: ProjectService;
  projectActivityService: ProjectActivityService;
  workspaceService: WorkspaceService;
  issueCommentService: IssueCommentService;
  issueTaskService: IssueTaskService;
  projectMemberRepository: ProjectMemberRepository;
  workspaceRepository: WorkspaceRepository;
  workspaceMemberRepository: WorkspaceMemberRepository;
  workspaceMemberInviteRepository: WorkspaceMemberInviteRepository;
  userRepository: UserRepository;
  issueRepository: IssueRepository;
  projectRepository: ProjectRepository;
  projectActivityRepository: ProjectActivityRepository;
  issueAssigneeRepository: IssueAssigneeRepository;
  issueCommentRepository: IssueCommentRepository;
  issueTaskRepository: IssueTaskRepository;
  projectCreatedPublisher: ProjectCreatedPublisher;
  projectUpdatedPublisher: ProjectUpdatedPublisher;
  workspaceCreatedPublisher: WorkspaceCreatedPublisher;
  workspaceInviteCreatedPublisher: WorkspaceInviteCreatedPublisher;
  projectMemberCreatedPublisher: ProjectMemberCreatedPublisher;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  issueCreatedPublisher: IssueCreatedPublisher;
}

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      routes: [
        {
          prefix: "/api/v1/issue-tracker/issues",
          route: issueRoutes(container),
        },
        {
          prefix: "/api/v1/issue-tracker/issues",
          route: issueCommentRoutes(container),
        },
        {
          prefix: "/api/v1/issue-tracker/issues",
          route: issueTaskRoutes(container),
        },
        {
          prefix: "/api/v1/issue-tracker/projects",
          route: projectRoutes(container),
        },
        {
          prefix: "/api/v1/issue-tracker/workspaces",
          route: workspaceRoutes(container),
        },
        {
          prefix: "/api/v1/issue-tracker/activities",
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
};

const main = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
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
    ["issue", "workspace", "project", "user"],
    logger,
  );
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
  add("projectController", asClass(CoreProjectController));
  add("workspaceController", asClass(CoreWorkspaceController));
  add("projectActivityController", asClass(CoreProjectActivityController));
  add("userService", asClass(CoreUserService));
  add("issueService", asClass(CoreIssueService));
  add("issueCommentService", asClass(CoreIssueCommentService));
  add("issueTaskService", asClass(CoreIssueTaskService));
  add("projectService", asClass(CoreProjectService));
  add("projectActivityService", asClass(CoreProjectActivityService));
  add("projectMemberRepository", asClass(PostgresProjectMemberRepository));
  add("projectActivityRepository", asClass(PostgresProjectActivityRepository));
  add("workspaceService", asClass(CoreWorkspaceService));
  add("workspaceRepository", asClass(PostgresWorkspaceRepository));
  add("workspaceMemberRepository", asClass(PostgresWorkspaceMemberRepository));
  add(
    "workspaceMemberInviteRepository",
    asClass(PostgresWorkspaceMemberInviteRepository),
  );
  add("userRepository", asClass(PostgresUserRepository));
  add("issueRepository", asClass(PostgresIssueRepository));
  add("projectRepository", asClass(PostgresProjectRepository));
  add("issueAssigneeRepository", asClass(PostgresIssueAssigneeRepository));
  add("issueCommentRepository", asClass(PostgresIssueCommentRepository));
  add("issueTaskRepository", asClass(PostgresIssueTaskRepository));
  add("projectCreatedPublisher", asClass(ProjectCreatedPublisher));
  add("projectUpdatedPublisher", asClass(ProjectUpdatedPublisher));
  add("workspaceCreatedPublisher", asClass(WorkspaceCreatedPublisher));
  add("projectMemberCreatedPublisher", asClass(ProjectMemberCreatedPublisher));
  add(
    "workspaceInviteCreatedPublisher",
    asClass(WorkspaceInviteCreatedPublisher),
  );
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
  add("issueCreatedPublisher", asClass(IssueCreatedPublisher));

  container.init();

  await startServer(container);
  startSubscriptions(container);
};

main();
