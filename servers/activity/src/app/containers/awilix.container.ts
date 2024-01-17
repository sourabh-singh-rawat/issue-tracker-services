import { Logger } from "pino";
import { DataSource } from "typeorm";
import { createContainer, asValue, InjectionMode, asClass } from "awilix";
import {
  logger,
  TypeormStore,
  NatsMessenger,
  AwilixContainer,
} from "@sourabhrawatcc/core-utils";
import {
  dataSource,
  postgresTypeormStore,
} from "../stores/postgres-typeorm.store";
import { messenger } from "../messengers/nats.messenger";

import { UserService } from "../../services/interfaces/user.service";

import { UserRepository } from "../../data/repositories/interfaces/user.repository";

import { CoreUserService } from "../../services/core-user.service";

import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";

import { UserCreatedSubscriber } from "../../messages/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "../../messages/subscribers/user-updated.subscriber";
import { ProjectCreatedSubscriber } from "../../messages/subscribers/project-created.subscriber";
import { CoreProjectActivityService } from "../../services/core-project-activity.service";
import { ProjectActivityService } from "../../services/interfaces/project-activity.service";
import { ProjectActivityRepository } from "../../data/repositories/interfaces/project-activity.repository";
import { PostgresProjectActivityRepository } from "../../data/repositories/postgres-project-activity.repository";
import { ProjectUpdatedSubscriber } from "../../messages/subscribers/project-updated.subscriber";
import { CoreProjectActivityController } from "../../controllers/core-project-activity.controller";
import { ProjectActivityController } from "../../controllers/interfaces/project-activity.controller";
import { IssueCreatedSubscriber } from "../../messages/subscribers/issue-created.subscriber";
import { CoreIssueActivityService } from "../../services/core-issue-activity.service";
import { IssueActivityService } from "../../services/interfaces/issue-activity.service";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  messenger: NatsMessenger;
  postgresTypeormStore: TypeormStore;
  userService: UserService;
  userRepository: UserRepository;
  projectActivityController: ProjectActivityController;
  projectActivityService: ProjectActivityService;
  projectActivityRepository: ProjectActivityRepository;
  issueActivityService: IssueActivityService;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  projectCreatedSubscriber: ProjectCreatedSubscriber;
  projectUpdatedSubscriber: ProjectUpdatedSubscriber;
  issueCreatedSubscriber: IssueCreatedSubscriber;
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
add("dataSource", asValue(dataSource));
add("postgresTypeormStore", asValue(postgresTypeormStore));
add("messenger", asValue(messenger));
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("projectActivityService", asClass(CoreProjectActivityService));
add("projectActivityController", asClass(CoreProjectActivityController));
add("projectActivityRepository", asClass(PostgresProjectActivityRepository));
add("issueActivityService", asClass(CoreIssueActivityService));
add("projectCreatedSubscriber", asClass(ProjectCreatedSubscriber));
add("projectUpdatedSubscriber", asClass(ProjectUpdatedSubscriber));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
add("issueCreatedSubscriber", asClass(IssueCreatedSubscriber));
