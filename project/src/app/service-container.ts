import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  PostgresService,
  AwilixServiceContainer,
  logger,
  NatsMessageService,
} from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";
import { dataSource, databaseService } from "./database-service";
import { messageService } from "./message-system.config";

import { ProjectController } from "../controllers/interfaces/project.controller";

import { UserService } from "../services/interfaces/user.service";
import { ProjectService } from "../services/interfaces/project.service";

import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { ProjectRepository } from "../data/repositories/interfaces/project.repository";
import { WorkspaceRepository } from "../data/repositories/interfaces/workspace.repository";

import { CoreProjectController } from "../controllers/core-project.controller";

import { CoreUserService } from "../services/core-user.service";
import { CoreProjectService } from "../services/core-project.service";

import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { PostgresProjectRepository } from "../data/repositories/postgres-project.repository";
import { PostgresProjectMemberRepository } from "../data/repositories/postgres-project-member.repository";
import { PostgresWorkspaceRepository } from "../data/repositories/postgres-workspace.repository";

import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "../messages/subscribers/user-updated.subscribers";
import { WorkspaceCreatedSubscriber } from "../messages/subscribers/workspace-created.subscriber";
import { ProjectMemberRepository } from "../data/repositories/interfaces/project-member";
import {
  ProjectCasbinPolicyManager,
  projectPolicyManager,
} from "./project-policy-manager";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  databaseService: PostgresService;
  messageService: NatsMessageService;
  projectPolicyManager: ProjectCasbinPolicyManager;
  projectController: ProjectController;
  userService: UserService;
  projectService: ProjectService;
  userRepository: UserRepository;
  workspaceRepository: WorkspaceRepository;
  projectRepository: ProjectRepository;
  projectMemberRepository: ProjectMemberRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  workspaceCreatedSubscriber: WorkspaceCreatedSubscriber;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});
export const serviceContainer = new AwilixServiceContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = serviceContainer;

add("logger", asValue(logger));
add("dataSource", asValue(dataSource));
add("databaseService", asValue(databaseService));
add("messageService", asValue(messageService));
add("projectPolicyManager", asValue(projectPolicyManager));
add("projectController", asClass(CoreProjectController));
add("userService", asClass(CoreUserService));
add("projectService", asClass(CoreProjectService));
add("userRepository", asClass(PostgresUserRepository));
add("workspaceRepository", asClass(PostgresWorkspaceRepository));
add("projectRepository", asClass(PostgresProjectRepository));
add("projectMemberRepository", asClass(PostgresProjectMemberRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("workspaceCreatedSubscriber", asClass(WorkspaceCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));