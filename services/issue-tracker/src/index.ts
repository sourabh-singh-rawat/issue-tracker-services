import "dotenv/config";
import {
  Broker,
  NatsBroker,
  NatsPublisher,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";
import fastify from "fastify";
import { IssueCommentController } from "./controllers/interfaces/issue-comment.controller";
import { IssueTaskController } from "./controllers/interfaces/issue-task.controller";
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
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { CoreIssueCommentController } from "./controllers/core-issue-comment.controller";
import { CoreIssueTaskController } from "./controllers/core-issue-task.controller";
import { CoreIssueCommentService } from "./services/core-issue-comment.service";
import { CoreIssueTaskService } from "./services/core-issue-task.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresIssueRepository } from "./data/repositories/postgres-issue.repository";
import { PostgresProjectRepository } from "./data/repositories/postgres-project.repository";
import { PostgresIssueAssigneeRepository } from "./data/repositories/postgres-issue-assignee.repository";
import { PostgresIssueCommentRepository } from "./data/repositories/postgres-issue-comment.repository";
import { PostgresIssueTaskRepository } from "./data/repositories/postgres-issue-task.repository";
import { UserEmailVerifiedSubscriber } from "./events/subscribers/user-email-verified.subscriber";
import { WorkspaceController } from "./controllers/interfaces/workspace.controller";
import { CoreWorkspaceController } from "./controllers/core-workspace.controller";
import { CoreListService } from "./services/CoreListService";
import { ListService } from "./services/interfaces/ListService";
import { WorkspaceService } from "./services/interfaces/WorkspaceService";
import { CoreWorkspaceService } from "./services/CoreWorkspaceService";
import { WorkspaceRepository } from "./data/repositories/interfaces/workspace.repository";
import { PostgresWorkspaceRepository } from "./data/repositories/postgres-workspace.repository";
import { WorkspaceMemberRepository } from "./data/repositories/interfaces/workspace-member.repository";
import { PostgresWorkspaceMemberRepository } from "./data/repositories/postgres-workspace-member.repository";
import { PostgresWorkspaceInviteTokenRepository } from "./data/repositories/postgres-workspace-invite-token.repository";
import { ProjectActivityController } from "./controllers/interfaces/project-activity.controller";
import { CoreProjectActivityController } from "./controllers/core-project-activity.controller";
import { CoreProjectActivityService } from "./services/core-project-activity.service";
import { ProjectActivityService } from "./services/interfaces/project-activity.service";
import { PostgresProjectActivityRepository } from "./data/repositories/postgres-project-activity.repository";
import { ProjectActivityRepository } from "./data/repositories/interfaces/project-activity.repository";
import { JwtToken } from "@issue-tracker/security";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import {
  CoreWorkspaceResolver,
  CoreItemResolver,
  CoreListResolver,
  CoreSpaceResolver,
  CoreStatusResolver,
} from "./Resolvers";
import {
  CoreItemService,
  CoreSpaceService,
  CoreStatusService,
  CoreUserService,
  ItemService,
  SpaceService,
  StatusService,
  UserService,
} from "./services";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  orm: Typeorm;
  broker: Broker;
  issueCommentController: IssueCommentController;
  issueTaskController: IssueTaskController;
  workspaceController: WorkspaceController;
  projectActivityController: ProjectActivityController;
  userService: UserService;
  itemService: ItemService;
  listService: ListService;
  statusService: StatusService;
  projectActivityService: ProjectActivityService;
  workspaceService: WorkspaceService;
  spaceService: SpaceService;
  issueCommentService: IssueCommentService;
  issueTaskService: IssueTaskService;
  workspaceRepository: WorkspaceRepository;
  workspaceMemberRepository: WorkspaceMemberRepository;
  userRepository: UserRepository;
  issueRepository: IssueRepository;
  projectRepository: ProjectRepository;
  projectActivityRepository: ProjectActivityRepository;
  issueAssigneeRepository: IssueAssigneeRepository;
  issueCommentRepository: IssueCommentRepository;
  issueTaskRepository: IssueTaskRepository;
  userEmailVerifiedSubscriber: UserEmailVerifiedSubscriber;
  publisher: Publisher<Subjects>;
}

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

  if (token) {
    return { req, rep, user: { email: token.email, userId: token.userId } };
  }

  return { req, rep };
};

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const instance = fastify();
    const schema = await buildSchema({
      emitSchemaFile: true,
      resolvers: [
        CoreWorkspaceResolver,
        CoreSpaceResolver,
        CoreListResolver,
        CoreItemResolver,
        CoreStatusResolver,
      ],
    });
    const apollo = new ApolloServer({
      schema,
      plugins: [fastifyApolloDrainPlugin(instance)],
    });
    await apollo.start();

    const server = new FastifyServer({
      fastify: instance,
      configuration: {
        host: "0.0.0.0",
        port: 5001,
        environment: "development",
        version: 1,
      },
      security: {
        cors: { credentials: true, origin: "http://localhost:3000" },
        cookie: { secret: process.env.JWT_SECRET! },
      },
      routes: [
        // { route: issueRoutes(container) },
        // { route: issueCommentRoutes(container) },
        // { route: issueTaskRoutes(container) },
        // { route: projectRoutes(container) },
        // { route: projectActivityRoutes(container) },
        // { route: workspaceRoutes(container) },
      ],
    });
    instance.route({
      url: "/api/graphql",
      method: ["POST", "GET"],
      handler: fastifyApolloHandler(apollo, { context: createContext }),
    });
    server.init();
  } catch (error) {
    process.exit(1);
  }
};

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userEmailVerifiedSubscriber").fetchMessages();
};

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.ISSUE_TRACKER_POSTGRES_CLUSTER_URL,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});

export const container = new AwilixDi<RegisteredServices>(awilix, logger);

const main = async () => {
  const orm = new PostgresTypeorm(dataSource, logger);
  await orm.init();

  const natsBroker = new NatsBroker({
    servers: [process.env.NATS_CLUSTER_URL!],
    streams: ["issue", "workspace", "project", "user"],
    logger,
  });
  await natsBroker.init();

  container.add("logger", asValue(logger));
  container.add("dataSource", asValue(dataSource));
  container.add("orm", asValue(orm));
  container.add("broker", asValue(natsBroker));
  container.add("issueCommentController", asClass(CoreIssueCommentController));
  container.add("issueTaskController", asClass(CoreIssueTaskController));
  container.add("workspaceController", asClass(CoreWorkspaceController));
  container.add(
    "projectActivityController",
    asClass(CoreProjectActivityController),
  );
  container.add("userService", asClass(CoreUserService));
  container.add("itemService", asClass(CoreItemService));
  container.add("statusService", asClass(CoreStatusService));
  container.add("spaceService", asClass(CoreSpaceService));
  container.add("issueCommentService", asClass(CoreIssueCommentService));
  container.add("issueTaskService", asClass(CoreIssueTaskService));
  container.add("listService", asClass(CoreListService));
  container.add("projectActivityService", asClass(CoreProjectActivityService));
  container.add(
    "projectActivityRepository",
    asClass(PostgresProjectActivityRepository),
  );
  container.add("workspaceService", asClass(CoreWorkspaceService));
  container.add("workspaceRepository", asClass(PostgresWorkspaceRepository));
  container.add(
    "workspaceMemberRepository",
    asClass(PostgresWorkspaceMemberRepository),
  );
  container.add(
    "workspaceInviteTokenRepository",
    asClass(PostgresWorkspaceInviteTokenRepository),
  );
  container.add("userRepository", asClass(PostgresUserRepository));
  container.add("issueRepository", asClass(PostgresIssueRepository));
  container.add("projectRepository", asClass(PostgresProjectRepository));
  container.add(
    "issueAssigneeRepository",
    asClass(PostgresIssueAssigneeRepository),
  );
  container.add(
    "issueCommentRepository",
    asClass(PostgresIssueCommentRepository),
  );
  container.add("issueTaskRepository", asClass(PostgresIssueTaskRepository));
  container.add(
    "userEmailVerifiedSubscriber",
    asClass(UserEmailVerifiedSubscriber),
  );
  container.add("publisher", asClass(NatsPublisher));

  container.init();

  await startServer(container);
  startSubscriptions(container);
};

main();
