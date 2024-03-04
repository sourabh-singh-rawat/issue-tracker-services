import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  TypeormStore,
  AwilixContainer,
  logger,
  Messenger,
} from "@sourabhrawatcc/core-utils";
import { store } from "../stores/postgres-typeorm.store";
import { messenger } from "../messengers/nats.messenger";

import { UserController } from "../../controllers/interfaces/user.controller";
import { UserService } from "../../services/interface/user.service";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";

import { CoreUserController } from "../../controllers/core-user.controller";

import { CoreUserService } from "../../services/core-user.service";

import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { UserProfileRepository } from "../../data/repositories/interfaces/user-profile.repository";
import { PostgresUserProfileRepository } from "../../data/repositories/postgres-user-profile.repository";

// publishers and subscribers
import { UserCreatedPublisher } from "../../messages/publishers/user-created.publisher";
import { UserUpdatedPublisher } from "../../messages/publishers/user-updated.publisher";

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

export const container = new AwilixContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = container;

add("logger", asValue(logger));
add("store", asValue(store));
add("messenger", asValue(messenger));
add("userController", asClass(CoreUserController));
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("userProfileRepository", asClass(PostgresUserProfileRepository));
add("userCreatedPublisher", asClass(UserCreatedPublisher));
add("userUpdatedPublisher", asClass(UserUpdatedPublisher));
