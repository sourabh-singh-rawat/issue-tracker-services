import { Logger } from "pino";
import {
  createContainer,
  asValue,
  asClass,
  InjectionMode,
  BuildResolverOptions,
} from "awilix";
import {
  AwilixContainer,
  logger,
  NatsMessenger,
  TypeormStore,
} from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";
import { dataSource } from "../stores/postgres-typeorm.store";
import { store } from "../stores";
import { natsMessenger } from "../messengers/nats.messenger";
import { CasbinProjectGuardian, CasbinWorkspaceGuardian } from "../guardians";

import { ProjectController } from "../../controllers/interfaces/project.controller";

import { UserService } from "../../services/interfaces/user.service";
import { ProjectService } from "../../services/interfaces/project.service";

import { UserRepository } from "../../repositories/interfaces/user.repository";
import { ProjectRepository } from "../../repositories/interfaces/project.repository";
import { WorkspaceRepository } from "../../repositories/interfaces/workspace.repository";
import { WorkspaceMemberRepository } from "../../repositories/interfaces/workspace-member.repository";

import { CoreProjectController } from "../../controllers/core-project.controller";

import { CoreUserService } from "../../services/core-user.service";
import { CoreProjectService } from "../../services/core-project.service";

import { PostgresUserRepository } from "../../repositories/postgres-user.repository";
import { PostgresProjectRepository } from "../../repositories/postgres-project.repository";
import { PostgresProjectMemberRepository } from "../../repositories/postgres-project-member.repository";
import { PostgresWorkspaceRepository } from "../../repositories/postgres-workspace.repository";
import { PostgresWorkspaceMemberRepository } from "../../repositories/postgres-workspace-member.repository";

import { UserCreatedSubscriber } from "../../messages/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "../../messages/subscribers/user-updated.subscriber";
import { ProjectCreatedPublisher } from "../../messages/publishers/project-created.publisher";
import { ProjectUpdatedPublisher } from "../../messages/publishers/project-updated.publisher";
import { ProjectMemberCreatedPublisher } from "../../messages/publishers/project-member-created.publisher";

import { WorkspaceCreatedSubscriber } from "../../messages/subscribers/workspace-created.subscriber";
import { ProjectMemberRepository } from "../../repositories/interfaces/project-member";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  store: TypeormStore;
  messenger: NatsMessenger;
  casbinProjectGuardian: CasbinProjectGuardian;
  casbinWorkspaceGuardian: CasbinWorkspaceGuardian;
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

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});

export const awilixContainer = new AwilixContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = awilixContainer;
const options: BuildResolverOptions<
  CasbinProjectGuardian | CasbinWorkspaceGuardian
> = { lifetime: "SINGLETON" };

add("logger", asValue(logger));
add("messenger", asValue(natsMessenger));
add("dataSource", asValue(dataSource));
add("store", asValue(store));
add("casbinProjectGuardian", asClass(CasbinProjectGuardian, options));
add("casbinWorkspaceGuardian", asClass(CasbinWorkspaceGuardian, options));
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
