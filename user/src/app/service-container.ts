import { Logger } from "pino";
import { createContainer, asValue, asClass } from "awilix";
import {
  PostgresService,
  AwilixServiceContainer,
  logger,
  MessageService,
} from "@sourabhrawatcc/core-utils";
import { databaseService } from "./database-service";
import { messageService } from "./message-system.config";

import { UserController } from "../controllers/interfaces/user.controller";
import { UserService } from "../services/interface/user.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";

import { CoreUserController } from "../controllers/core-user.controller";
import { CoreUserService } from "../services/core-user.service";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "../data/repositories/postgres-user-profile.repository";

export interface RegisteredServices {
  logger: Logger;
  databaseService: PostgresService;
  messageService: MessageService;
  userController: UserController;
  userService: UserService;
  userRepository: UserRepository;
  userProfileRepository: UserProfileRepository;
}

const awilix = createContainer<RegisteredServices>();
export const container = new AwilixServiceContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = container;

add("logger", asValue(logger));
add("databaseService", asValue(databaseService));
add("messageService", asValue(messageService));
add("userController", asClass(CoreUserController));
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("userProfileRepository", asClass(PostgresUserProfileRepository));
