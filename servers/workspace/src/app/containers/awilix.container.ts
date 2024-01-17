import { Logger } from "pino";
import { DataSource } from "typeorm";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import {
  logger,
  AwilixContainer,
  TypeormStore,
  Messenger,
} from "@sourabhrawatcc/core-utils";
import { store, dbSource } from "../stores/postgres-typeorm.store";
import { messenger } from "../messengers/nats.messenger";
import {
  WorkspaceGuardian,
  workspaceGuardian,
} from "../guardians/casbin/workspace.guardian";

// Controllers
import { WorkspaceController } from "../../controllers/interfaces/workspace-controller";
import { CoreWorkspaceController } from "../../controllers/core-workspace.controller";

// Services
import { UserService } from "../../services/interfaces/user.service";
import { WorkspaceService } from "../../services/interfaces/workspace.service";
import { CoreUserService } from "../../services/core-user.service";
import { CoreWorkspaceService } from "../../services/core-workspace.service";

// Repositories
import { UserRepository } from "../../data/repositories/interface/user-repository";
import { WorkspaceRepository } from "../../data/repositories/interface/workspace-repository";
import { WorkspaceMemberRepository } from "../../data/repositories/interface/workspace-member";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "../../data/repositories/postgres-workspace.repository";
import { PostgresWorkspaceMemberRepository } from "../../data/repositories/postgres-workspace-member.repository";

// Publishers and Subscribers
import { WorkspaceCreatedPublisher } from "../../messages/publishers/workspace-created.publisher";
import { UserCreatedSubscriber } from "../../messages/subscribers/user-created.subscribers";
import { UserUpdatedSubscriber } from "../../messages/subscribers/user-updated.subscribers";
import { WorkspaceInviteCreatedPublisher } from "../../messages/publishers/workspace-invite-created.publisher";
import { WorkspaceMemberInviteRepository } from "../../data/repositories/interface/workspace-member-invite.repository";
import { PostgresWorkspaceMemberInviteRepository } from "../../data/repositories/postgres-workspace-member-invite.repository";

export interface RegisteredServices {
  logger: Logger;
  dbSource: DataSource;
  store: TypeormStore;
  workspaceGuardian: WorkspaceGuardian;
  messenger: Messenger;
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

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});
export const container = new AwilixContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = container;

add("logger", asValue(logger));
add("dbSource", asValue(dbSource));
add("store", asValue(store));
add("messenger", asValue(messenger));
add("workspaceGuardian", asValue(workspaceGuardian));
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
