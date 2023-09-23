import { Logger } from "pino";
import { DataSource } from "typeorm";
import { asClass, asValue, createContainer } from "awilix";
import {
  AwilixServiceContainer,
  NatsMessageServer,
  PostgresContext,
  logger,
} from "@sourabhrawatcc/core-utils";
import { app } from "./app.config";
import { dbContext, dbSource } from "./db.config";
import { Casbin } from "./casbin.config";
import { messageServer } from "./message-system.config";

import { WorkspaceController } from "../controllers/interfaces/workspace-controller";
import { CoreWorkspaceController } from "../controllers/core-workspace.controller";

import { WorkspaceService } from "../services/interfaces/workspace.service";
import { CoreWorkspaceService } from "../services/core-workspace.service";

import { UserRepository } from "../data/repositories/interface/user-repository";
import { WorkspaceRepository } from "../data/repositories/interface/workspace-repository";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { PostgresWorkspaceRepository } from "../data/repositories/postgres-workspace.repository";

import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscribers";
import { FastifyInstance } from "fastify";

export interface Services {
  app: FastifyInstance;
  logger: Logger;
  dbSource: DataSource;
  dbContext: PostgresContext;
  casbin: Casbin;
  messageServer: NatsMessageServer;
  workspaceController: WorkspaceController;
  workspaceService: WorkspaceService;
  userRepository: UserRepository;
  workspaceRepository: WorkspaceRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
}

const awilix = createContainer<Services>();
export const container = new AwilixServiceContainer<Services>(awilix, logger);

const { add } = container;

add("app", asValue(app));
add("logger", asValue(logger));
add("dbSource", asValue(dbSource));
add("dbContext", asValue(dbContext));
add("casbin", asClass(Casbin));
add("messageServer", asValue(messageServer));
add("workspaceController", asClass(CoreWorkspaceController));
add("workspaceService", asClass(CoreWorkspaceService));
add("userRepository", asClass(PostgresUserRepository));
add("workspaceRepository", asClass(PostgresWorkspaceRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
