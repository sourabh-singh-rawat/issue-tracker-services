import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  PostgresService,
  AwilixServiceContainer,
  logger,
  NatsMessageService,
} from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";
import { dataSource, databaseService } from "./database-service";
import { messageService } from "./message-system.config";

import { IssueController } from "../controllers/interfaces/issue-controller";
import { IssueCommentController } from "../controllers/interfaces/issue-comment.controller";
import { IssueTaskController } from "../controllers/interfaces/issue-task.controller";

import { UserService } from "../services/interfaces/user.service";
import { IssueService } from "../services/interfaces/issue.service";
import { IssueCommentService } from "../services/interfaces/issue-comment.service";
import { IssueTaskService } from "../services/interfaces/issue-task.service";

import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { IssueRepository } from "../data/repositories/interfaces/issue.repository";
import { IssueAssigneeRepository } from "../data/repositories/interfaces/issue-assignee.repository";
import { IssueCommentRepository } from "../data/repositories/interfaces/issue-comment.repository";
import { IssueTaskRepository } from "../data/repositories/interfaces/issue-task.repository";

import { CoreIssueController } from "../controllers/core-issue.controller";
import { CoreIssueCommentController } from "../controllers/core-issue-comment.controller";
import { CoreIssueTaskController } from "../controllers/core-issue-task.controller";

import { CoreUserService } from "../services/core-user.service";
import { CoreIssueService } from "../services/core-issue.service";
import { CoreIssueCommentService } from "../services/core-issue-comment.service";
import { CoreIssueTaskService } from "../services/core-issue-task.service";

import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { PostgresIssueRepository } from "../data/repositories/postgres-issue.repository";
import { PostgresIssueCommentRepository } from "../data/repositories/postgres-issue-comment.repository";
import { PostgresIssueAssigneeRepository } from "../data/repositories/postgres-issue-assignee.repository";
import { PostgresIssueTaskRepository } from "../data/repositories/postgres-issue-task.repository";

import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "../messages/subscribers/user-updated.subscribers";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  databaseService: PostgresService;
  messageService: NatsMessageService;
  issueController: IssueController;
  issueCommentController: IssueCommentController;
  issueTaskController: IssueTaskController;
  userService: UserService;
  issueService: IssueService;
  issueCommentService: IssueCommentService;
  issueTaskService: IssueTaskService;
  userRepository: UserRepository;
  issueRepository: IssueRepository;
  issueAssigneeRepository: IssueAssigneeRepository;
  issueCommentRepository: IssueCommentRepository;
  issueTaskRepository: IssueTaskRepository;
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
add("issueController", asClass(CoreIssueController));
add("issueCommentController", asClass(CoreIssueCommentController));
add("issueTaskController", asClass(CoreIssueTaskController));
add("userService", asClass(CoreUserService));
add("issueService", asClass(CoreIssueService));
add("issueCommentService", asClass(CoreIssueCommentService));
add("issueTaskService", asClass(CoreIssueTaskService));
add("userRepository", asClass(PostgresUserRepository));
add("issueRepository", asClass(PostgresIssueRepository));
add("issueAssigneeRepository", asClass(PostgresIssueAssigneeRepository));
add("issueCommentRepository", asClass(PostgresIssueCommentRepository));
add("issueTaskRepository", asClass(PostgresIssueTaskRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
