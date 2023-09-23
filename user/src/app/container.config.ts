import { FastifyInstance } from "fastify";
import { Logger } from "pino";
import { createContainer, asValue, asClass } from "awilix";
import {
  PostgresContext,
  AwilixServiceContainer,
  logger,
  MessageServer,
} from "@sourabhrawatcc/core-utils";
import { app } from "./app.config";
import { dbContext } from "./db.config";
import { messageServer } from "./message-system.config";

import { UserController } from "../controllers/interfaces/user.controller";
import { UserService } from "../services/interface/user.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";

import { CoreUserController } from "../controllers/core-user.controller";
import { CoreUserService } from "../services/core-user.service";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "../data/repositories/postgres-user-profile.repository";

export interface Services {
  app: FastifyInstance;
  logger: Logger;
  dbContext: PostgresContext;
  messageServer: MessageServer;
  userController: UserController;
  userService: UserService;
  userRepository: UserRepository;
  userProfileRepository: UserProfileRepository;
}

const awilix = createContainer<Services>();
export const container = new AwilixServiceContainer<Services>(awilix, logger);

const { add } = container;

add("app", asValue(app));
add("logger", asValue(logger));
add("dbContext", asValue(dbContext));
add("messageServer", asValue(messageServer));
add("userController", asClass(CoreUserController));
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("userProfileRepository", asClass(PostgresUserProfileRepository));
