import { WorkspaceController } from "./controllers/interfaces/workspace-controller";
import { UserService } from "./services/interfaces/user.service";
import { WorkspaceService } from "./services/interfaces/workspace.service";
import { UserRepository } from "./data/repositories/interface/user-repository";
import { WorkspaceRepository } from "./data/repositories/interface/workspace-repository";
import { WorkspaceMemberRepository } from "./data/repositories/interface/workspace-member";
import { WorkspaceMemberInviteRepository } from "./data/repositories/interface/workspace-member-invite.repository";

import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
import { DataSource } from "typeorm";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { workspaceRoutes } from "./routes/workspace.routes";
import { CoreWorkspaceController } from "./controllers/core-workspace.controller";
import { CoreUserService } from "./services/core-user.service";
import { CoreWorkspaceService } from "./services/core-workspace.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "./data/repositories/postgres-workspace.repository";
import { PostgresWorkspaceMemberRepository } from "./data/repositories/postgres-workspace-member.repository";
import { PostgresWorkspaceMemberInviteRepository } from "./data/repositories/postgres-workspace-member-invite.repository";
import { UserCreatedSubscriber } from "./events/subscribers/user-created.subscribers";
import { UserUpdatedSubscriber } from "./events/subscribers/user-updated.subscribers";
import { WorkspaceCreatedPublisher } from "./events/publishers/workspace-created.publisher";
import { WorkspaceInviteCreatedPublisher } from "./events/publishers/workspace-invite-created.publisher";

export interface RegisteredServices {
  logger: AppLogger;
  dbSource: DataSource;
  orm: Typeorm;
  eventBus: EventBus;
  workspaceController: WorkspaceController;
  userService: UserService;
  workspaceService: WorkspaceService;
  userRepository: UserRepository;
  workspaceRepository: WorkspaceRepository;
  workspaceMemberRepository: WorkspaceMemberRepository;
  workspaceMemberInviteRepository: WorkspaceMemberInviteRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  workspaceCreatedPublisher: WorkspaceCreatedPublisher;
  workspaceInviteCreatedPublisher: WorkspaceInviteCreatedPublisher;
}

const startServer = async (container: AwilixDi<RegisteredServices>) => {
  try {
    const server = new FastifyServer({
      routes: [
        {
          prefix: "/api/v1/workspaces",
          route: workspaceRoutes(container),
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

  add("logger", asValue(logger));
  add("dbSource", asValue(dataSource));
  add("orm", asValue(orm));
  add("eventBus", asValue(eventBus));
  add("workspaceController", asClass(CoreWorkspaceController));
  add("userService", asClass(CoreUserService));
  add("workspaceService", asClass(CoreWorkspaceService));
  add("userRepository", asClass(PostgresUserRepository));
  add("workspaceRepository", asClass(PostgresWorkspaceRepository));
  add("workspaceMemberRepository", asClass(PostgresWorkspaceMemberRepository));
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
  add("workspaceCreatedPublisher", asClass(WorkspaceCreatedPublisher));
  add(
    "workspaceInviteCreatedPublisher",
    asClass(WorkspaceInviteCreatedPublisher),
  );
  add(
    "workspaceMemberInviteRepository",
    asClass(PostgresWorkspaceMemberInviteRepository),
  );
  container.init();
  await startServer(container);
  startSubscriptions(container);
};

main();
