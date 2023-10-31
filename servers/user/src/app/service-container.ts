import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  PostgresService,
  AwilixServiceContainer,
  logger,
  NatsMessageService,
} from "@sourabhrawatcc/core-utils";
import { databaseService } from "./database-service";
import { messageService } from "./message-service";

import { UserController } from "../controllers/interfaces/user.controller";
import { UserService } from "../services/interface/user.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";

import { CoreUserController } from "../controllers/core-user.controller";

import { CoreUserService } from "../services/core-user.service";

import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "../data/repositories/postgres-user-profile.repository";

// publishers and subscribers
import { UserCreatedPublisher } from "../messages/publishers/user-created.publisher";
import { UserUpdatedPublisher } from "../messages/publishers/user-updated.publisher";

interface RegisteredServices {
  logger: Logger;
  databaseService: PostgresService;
  messageService: NatsMessageService;
  userController: UserController;
  userService: UserService;
  userRepository: UserRepository;
  userProfileRepository: UserProfileRepository;
  userCreatedPublisher: UserCreatedPublisher;
  userUpdatedPublisher: UserUpdatedPublisher;
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
add("databaseService", asValue(databaseService));
add("messageService", asValue(messageService));
add("userController", asClass(CoreUserController));
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("userProfileRepository", asClass(PostgresUserProfileRepository));
add("userCreatedPublisher", asClass(UserCreatedPublisher));
add("userUpdatedPublisher", asClass(UserUpdatedPublisher));
