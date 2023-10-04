import { Logger } from "pino";
import { createContainer, asValue, asClass } from "awilix";
import {
  PostgresService,
  AwilixServiceContainer,
  logger,
  NatsMessageService,
} from "@sourabhrawatcc/core-utils";
import { databaseService } from "./database-service";
import { messageService } from "./message-system.config";

import { ProjectController } from "../controllers/interfaces/project.controller";
import { ProjectService } from "../services/interfaces/project.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { WorkspaceRepository } from "../data/repositories/interfaces/workspace.repository";
import { ProjectRepository } from "../data/repositories/interfaces/project.repository";

import { CoreProjectController } from "../controllers/core-project.controller";
import { CoreProjectService } from "../services/core-project.service";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "../data/repositories/postgres-workspace.repository";
import { PostgresProjectRepository } from "../data/repositories/postgres-project.repository";

import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscriber";
import { WorkspaceCreatedSubscriber } from "../messages/subscribers/workspace-created.subscriber";

export interface RegisteredServices {
  logger: Logger;
  databaseService: PostgresService;
  messageService: NatsMessageService;
  projectController: ProjectController;
  projectService: ProjectService;
  userRepository: UserRepository;
  workspaceRepository: WorkspaceRepository;
  projectRepository: ProjectRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  workspaceCreatedSubscriber: WorkspaceCreatedSubscriber;
}

const awilix = createContainer<RegisteredServices>();
export const serviceContainer = new AwilixServiceContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = serviceContainer;

add("logger", asValue(logger));
add("databaseService", asValue(databaseService));
add("messageService", asValue(messageService));
add("projectController", asClass(CoreProjectController));
add("projectService", asClass(CoreProjectService));
add("userRepository", asClass(PostgresUserRepository));
add("workspaceRepository", asClass(PostgresWorkspaceRepository));
add("projectRepository", asClass(PostgresProjectRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("workspaceCreatedSubscriber", asClass(WorkspaceCreatedSubscriber));
