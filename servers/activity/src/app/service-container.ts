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
import { ProjectCreatedSubscriber } from "../messages/subscribers/project-created.subscriber";
import { CoreProjectActivityService } from "../services/core-project-activity.service";
import { ProjectActivityService } from "../services/interfaces/project-activity.service";
import { ProjectActivityRepository } from "../data/repositories/interfaces/project-activity.repository";
import { PostgresProjectActivityRepository } from "../data/repositories/postgres-project-activity.repository";
import { ProjectUpdatedSubscriber } from "../messages/subscribers/project-updated.subscriber";
import { CoreProjectActivityController } from "../controllers/core-project-activity.controller";
import { ProjectActivityController } from "../controllers/interfaces/project-activity.controller";

export interface RegisteredServices {
  logger: Logger;
  databaseService: PostgresService;
  dataSource: DataSource;
  messageService: NatsMessageService;
  userService: UserService;
  userRepository: UserRepository;
  projectActivityController: ProjectActivityController;
  projectActivityService: ProjectActivityService;
  projectActivityRepository: ProjectActivityRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  projectCreatedSubscriber: ProjectCreatedSubscriber;
  projectUpdatedSubscriber: ProjectUpdatedSubscriber;
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
add("projectActivityService", asClass(CoreProjectActivityService));
add("userRepository", asClass(PostgresUserRepository));
add("projectActivityController", asClass(CoreProjectActivityController));
add("projectActivityRepository", asClass(PostgresProjectActivityRepository));
add("projectCreatedSubscriber", asClass(ProjectCreatedSubscriber));
add("projectUpdatedSubscriber", asClass(ProjectUpdatedSubscriber));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
