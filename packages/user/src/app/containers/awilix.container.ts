import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  TypeormStore,
  AwilixContainer,
  logger,
  Messenger,
} from "@sourabhrawatcc/core-utils";
import { store } from "../stores";
import { messenger } from "../messengers";

import { UserController } from "../../controllers/interfaces/user.controller";
import { UserService } from "../../services/interface/user.service";

import { CoreUserController } from "../../controllers/core-user.controller";

import { CoreUserService } from "../../services/core-user.service";

import { UserCreatedPublisher } from "../../messages/publishers/user-created.publisher";
import { UserUpdatedPublisher } from "../../messages/publishers/user-updated.publisher";
import { UserRepository } from "../../repositories/interfaces/user.repository";
import { UserProfileRepository } from "../../repositories/interfaces/user-profile.repository";
import { PostgresUserRepository } from "../../repositories/postgres-user.repository";
import { PostgresUserProfileRepository } from "../../repositories/postgres-user-profile.repository";

interface RegisteredServices {
  logger: Logger;
  store: TypeormStore;
  messenger: Messenger;
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

export const awilixContainer = new AwilixContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = awilixContainer;

add("logger", asValue(logger));
add("store", asValue(store));
add("messenger", asValue(messenger));
add("userController", asClass(CoreUserController));
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("userProfileRepository", asClass(PostgresUserProfileRepository));
add("userCreatedPublisher", asClass(UserCreatedPublisher));
add("userUpdatedPublisher", asClass(UserUpdatedPublisher));
