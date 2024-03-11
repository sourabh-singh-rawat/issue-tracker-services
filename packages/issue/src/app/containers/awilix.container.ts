import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  TypeormStore,
  AwilixContainer,
  logger,
  Messenger,
} from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";
import { dataSource } from "../stores/postgres-typeorm.store";
import { store } from "../stores";
import { messenger } from "../messengers";

import { IssueController } from "../../controllers/interfaces/issue-controller";
import { IssueCommentController } from "../../controllers/interfaces/issue-comment.controller";
import { IssueTaskController } from "../../controllers/interfaces/issue-task.controller";

import { UserService } from "../../services/interfaces/user.service";
import { IssueService } from "../../services/interfaces/issue.service";
import { IssueCommentService } from "../../services/interfaces/issue-comment.service";
import { IssueTaskService } from "../../services/interfaces/issue-task.service";

import { UserRepository } from "../../repositories/interfaces/user.repository";
import { IssueRepository } from "../../repositories/interfaces/issue.repository";
import { IssueAssigneeRepository } from "../../repositories/interfaces/issue-assignee.repository";
import { IssueCommentRepository } from "../../repositories/interfaces/issue-comment.repository";
import { IssueTaskRepository } from "../../repositories/interfaces/issue-task.repository";

import { CoreIssueController } from "../../controllers/core-issue.controller";
import { CoreIssueCommentController } from "../../controllers/core-issue-comment.controller";
import { CoreIssueTaskController } from "../../controllers/core-issue-task.controller";

import { CoreUserService } from "../../services/core-user.service";
import { CoreIssueService } from "../../services/core-issue.service";
import { CoreIssueCommentService } from "../../services/core-issue-comment.service";
import { CoreIssueTaskService } from "../../services/core-issue-task.service";

import { PostgresUserRepository } from "../../repositories/postgres-user.repository";
import { PostgresIssueRepository } from "../../repositories/postgres-issue.repository";
import { PostgresIssueCommentRepository } from "../../repositories/postgres-issue-comment.repository";
import { PostgresIssueAssigneeRepository } from "../../repositories/postgres-issue-assignee.repository";
import { PostgresIssueTaskRepository } from "../../repositories/postgres-issue-task.repository";

import { UserCreatedSubscriber } from "../../messages/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "../../messages/subscribers/user-updated.subscribers";
import { ProjectCreatedSubscriber } from "../../messages/subscribers/project-created.subscriber";
import { ProjectRepository } from "../../repositories/interfaces/project.repository";
import { PostgresProjectRepository } from "../../repositories/postgres-project.repository";
import {
  CasbinIssueGuardian,
  issueGuardian,
} from "../guardians/casbin/casbin-issue.guardian";
import {
  CasbinProjectGuardian,
  projectGuardian,
} from "../guardians/casbin/casbin-project.guardian";
import { IssueCreatedPublisher } from "../../messages/publishers/issue-created.publisher";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  store: TypeormStore;
  messenger: Messenger;
  issueController: IssueController;
  issueCommentController: IssueCommentController;
  issueTaskController: IssueTaskController;
  userService: UserService;
  issueService: IssueService;
  issueCommentService: IssueCommentService;
  issueTaskService: IssueTaskService;
  userRepository: UserRepository;
  issueRepository: IssueRepository;
  projectRepository: ProjectRepository;
  issueAssigneeRepository: IssueAssigneeRepository;
  issueCommentRepository: IssueCommentRepository;
  issueTaskRepository: IssueTaskRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
  projectCreatedSubscriber: ProjectCreatedSubscriber;
  issueCreatedPublisher: IssueCreatedPublisher;
  issueGuardian: CasbinIssueGuardian;
  projectGuardian: CasbinProjectGuardian;
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
add("issueController", asClass(CoreIssueController));
add("issueCommentController", asClass(CoreIssueCommentController));
add("issueTaskController", asClass(CoreIssueTaskController));
add("userService", asClass(CoreUserService));
add("issueService", asClass(CoreIssueService));
add("issueCommentService", asClass(CoreIssueCommentService));
add("issueTaskService", asClass(CoreIssueTaskService));
add("userRepository", asClass(PostgresUserRepository));
add("issueRepository", asClass(PostgresIssueRepository));
add("projectRepository", asClass(PostgresProjectRepository));
add("issueAssigneeRepository", asClass(PostgresIssueAssigneeRepository));
add("issueCommentRepository", asClass(PostgresIssueCommentRepository));
add("issueTaskRepository", asClass(PostgresIssueTaskRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
add("projectCreatedSubscriber", asClass(ProjectCreatedSubscriber));
add("issueGuardian", asValue(issueGuardian));
add("projectGuardian", asValue(projectGuardian));
add("issueCreatedPublisher", asClass(IssueCreatedPublisher));
