import { Logger } from "pino";
import { DataSource } from "typeorm";
import { asClass, asValue, createContainer } from "awilix";
import {
  logger,
  AwilixServiceContainer,
  DatabaseService,
  NatsMessageService,
} from "@sourabhrawatcc/core-utils";
import { databaseService, dbSource } from "./database-service";
import { messageService } from "./message-service";
import { WorkspaceCasbinPolicyManager, policyManager } from "./policy-manager";

// Controllers
import { WorkspaceController } from "../controllers/interfaces/workspace-controller";
import { CoreWorkspaceController } from "../controllers/core-workspace.controller";

// Services
import { WorkspaceService } from "../services/interfaces/workspace.service";
import { CoreWorkspaceService } from "../services/core-workspace.service";

// Repositories
import { UserRepository } from "../data/repositories/interface/user-repository";
import { WorkspaceRepository } from "../data/repositories/interface/workspace-repository";
import { WorkspaceMemberRepository } from "../data/repositories/interface/workspace-member";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "../data/repositories/postgres-workspace.repository";
import { PostgresWorkspaceMemberRepository } from "../data/repositories/postgres-workspace-member.repository";

// Publishers and Subscribers
import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscribers";

export interface RegisteredServices {
  logger: Logger;
  dbSource: DataSource;
  databaseService: DatabaseService;
  policyManager: WorkspaceCasbinPolicyManager;
  messageService: NatsMessageService;
  workspaceController: WorkspaceController;
  workspaceService: WorkspaceService;
  userRepository: UserRepository;
  workspaceRepository: WorkspaceRepository;
  workspaceMemberRepository: WorkspaceMemberRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
}

const awilix = createContainer<RegisteredServices>();
export const serviceContainer = new AwilixServiceContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = serviceContainer;

add("logger", asValue(logger));
add("dbSource", asValue(dbSource));
add("databaseService", asValue(databaseService));
add("messageService", asValue(messageService));
add("policyManager", asValue(policyManager));
add("workspaceController", asClass(CoreWorkspaceController));
add("workspaceService", asClass(CoreWorkspaceService));
add("userRepository", asClass(PostgresUserRepository));
add("workspaceRepository", asClass(PostgresWorkspaceRepository));
add("workspaceMemberRepository", asClass(PostgresWorkspaceMemberRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
