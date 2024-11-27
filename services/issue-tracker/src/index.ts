import "dotenv/config";
import {
  Broker,
  NatsBroker,
  NatsPublisher,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";
import {
  CreateFastifyContextOptions,
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { IssueController } from "./controllers/interfaces/issue-controller";
import { IssueCommentController } from "./controllers/interfaces/issue-comment.controller";
import { IssueTaskController } from "./controllers/interfaces/issue-task.controller";
import { UserService } from "./services/interfaces/UserService";
import { ItemService } from "./services/interfaces/ItemService";
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
import { CoreIssueController } from "./controllers/core-issue.controller";
import { CoreIssueCommentController } from "./controllers/core-issue-comment.controller";
import { CoreIssueTaskController } from "./controllers/core-issue-task.controller";
import { CoreUserService } from "./services/CoreUserService";
import { CoreItemService } from "./services/CoreItemService";
import { CoreIssueCommentService } from "./services/core-issue-comment.service";
import { CoreIssueTaskService } from "./services/core-issue-task.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresIssueRepository } from "./data/repositories/postgres-issue.repository";
import { PostgresProjectRepository } from "./data/repositories/postgres-project.repository";
import { PostgresIssueAssigneeRepository } from "./data/repositories/postgres-issue-assignee.repository";
import { PostgresIssueCommentRepository } from "./data/repositories/postgres-issue-comment.repository";
import { PostgresIssueTaskRepository } from "./data/repositories/postgres-issue-task.repository";
import { UserEmailVerifiedSubscriber } from "./events/subscribers/user-email-verified.subscriber";
import { ProjectController } from "./controllers/interfaces/project.controller";
import { CoreProjectController } from "./controllers/core-project.controller";
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
import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { UnauthorizedError } from "@issue-tracker/common";
import { buildSchema } from "type-graphql";
import { CoreWorkspaceResolver } from "./resolvers/CoreWorkspaceResolver";
import { ApolloServer } from "@apollo/server";
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from "@as-integrations/fastify";
import { CoreListResolver } from "./resolvers/CoreListResolver";
import { CoreItemResolver } from "./resolvers/CoreItemResolver";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  orm: Typeorm;
  broker: Broker;
  issueController: IssueController;
  issueCommentController: IssueCommentController;
  issueTaskController: IssueTaskController;
  projectController: ProjectController;
  workspaceController: WorkspaceController;
  projectActivityController: ProjectActivityController;
  userService: UserService;
  itemService: ItemService;
  projectService: ListService;
  projectActivityService: ProjectActivityService;
  workspaceService: WorkspaceService;
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

const t = initTRPC.context<{ user: any; res: any }>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

export const issueTrackerRouter = router({
  createWorkspace: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const service = container.get("workspaceService");
      const { user } = ctx;

      return await dataSource.transaction(async (manager) => {
        return await service.createWorkspace({
          ...input,
          userId: user.userId,
          manager,
        });
      });
    }),
  getAllWorkspaces: publicProcedure
    .input(
      z.object({
        page: z.number().optional(),
      }),
    )
    .query(async ({ ctx }) => {
      if (!ctx.user) throw new UnauthorizedError();
      const { user } = ctx;
      const { userId } = user;

      const service = container.get("workspaceService");
      return await service.getAllWorkspaces(userId);
    }),
});

export type IssueTrackerRouter = typeof issueTrackerRouter;

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const instance = fastify();
    const schema = await buildSchema({
      emitSchemaFile: true,
      resolvers: [CoreItemResolver, CoreListResolver, CoreWorkspaceResolver],
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
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
    servers: [process.env.NATS_SERVER_URL || "nats"],
    streams: ["issue", "workspace", "project", "user"],
    logger,
  });
  await natsBroker.init();

  container.add("logger", asValue(logger));
  container.add("dataSource", asValue(dataSource));
  container.add("orm", asValue(orm));
  container.add("broker", asValue(natsBroker));
  container.add("issueController", asClass(CoreIssueController));
  container.add("issueCommentController", asClass(CoreIssueCommentController));
  container.add("issueTaskController", asClass(CoreIssueTaskController));
  container.add("projectController", asClass(CoreProjectController));
  container.add("workspaceController", asClass(CoreWorkspaceController));
  container.add(
    "projectActivityController",
    asClass(CoreProjectActivityController),
  );
  container.add("userService", asClass(CoreUserService));
  container.add("itemService", asClass(CoreItemService));
  container.add("issueCommentService", asClass(CoreIssueCommentService));
  container.add("issueTaskService", asClass(CoreIssueTaskService));
  container.add("projectService", asClass(CoreListService));
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
