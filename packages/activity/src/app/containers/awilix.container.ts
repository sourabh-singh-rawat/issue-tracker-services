import { Logger } from "pino";
import { DataSource } from "typeorm";
import { createContainer, asValue, InjectionMode, asClass } from "awilix";
import {
  logger,
  TypeormStore,
  Messenger,
  AwilixContainer,
} from "@sourabhrawatcc/core-utils";
import { dataSource } from "../stores/postgres-typeorm.store";
import { store } from "../stores";
import { messenger } from "../messengers";

import { UserService } from "../../services/interfaces/user.service";

import { CoreUserService } from "../../services/core-user.service";

import { UserCreatedSubscriber } from "../../messages/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "../../messages/subscribers/user-updated.subscriber";
import { ProjectCreatedSubscriber } from "../../messages/subscribers/project-created.subscriber";
import { CoreProjectActivityService } from "../../services/core-project-activity.service";
import { ProjectActivityService } from "../../services/interfaces/project-activity.service";
import { ProjectUpdatedSubscriber } from "../../messages/subscribers/project-updated.subscriber";
import { CoreProjectActivityController } from "../../controllers/core-project-activity.controller";
import { ProjectActivityController } from "../../controllers/interfaces/project-activity.controller";
import { IssueCreatedSubscriber } from "../../messages/subscribers/issue-created.subscriber";
import { CoreIssueActivityService } from "../../services/core-issue-activity.service";
import { IssueActivityService } from "../../services/interfaces/issue-activity.service";
import { UserRepository } from "../../repositories/interfaces/user.repository";
import { ProjectActivityRepository } from "../../repositories/interfaces/project-activity.repository";
import { PostgresUserRepository } from "../../repositories/postgres-user.repository";
import { PostgresProjectActivityRepository } from "../../repositories/postgres-project-activity.repository";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  messenger: Messenger;
  store: TypeormStore;
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
add("store", asValue(store));
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
