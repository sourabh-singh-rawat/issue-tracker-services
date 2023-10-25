import { Logger } from "pino";
import { DataSource } from "typeorm";
import { createContainer, asValue, InjectionMode, asClass } from "awilix";
import {
  logger,
  PostgresService,
  NatsMessageService,
  AwilixServiceContainer,
} from "@sourabhrawatcc/core-utils";
import { dataSource, databaseService } from "./database-service";
import { messageService } from "./message-system.config";

import { UserService } from "../services/interfaces/user.service";

import { UserRepository } from "../data/repositories/interfaces/user.repository";

import { CoreUserService } from "../services/core-user.service";

import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";

import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "../messages/subscribers/user-updated.subscriber";

export interface RegisteredServices {
  logger: Logger;
  databaseService: PostgresService;
  dataSource: DataSource;
  messageService: NatsMessageService;
  userService: UserService;
  userRepository: UserRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
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
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
