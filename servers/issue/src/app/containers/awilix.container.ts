import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  TypeormStore,
  AwilixContainer,
  logger,
  Messenger,
} from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";
import {
  dataSource,
  postgresTypeormStore,
} from "../stores/postgres-typeorm.store";
import { messenger } from "../messengers/nats.messenger";

import { IssueController } from "../../controllers/interfaces/issue-controller";
import { IssueCommentController } from "../../controllers/interfaces/issue-comment.controller";
import { IssueTaskController } from "../../controllers/interfaces/issue-task.controller";

import { UserService } from "../../services/interfaces/user.service";
import { IssueService } from "../../services/interfaces/issue.service";
import { IssueCommentService } from "../../services/interfaces/issue-comment.service";
import { IssueTaskService } from "../../services/interfaces/issue-task.service";

import { UserRepository } from "../../data/repositories/interfaces/user.repository";
import { IssueRepository } from "../../data/repositories/interfaces/issue.repository";
import { IssueAssigneeRepository } from "../../data/repositories/interfaces/issue-assignee.repository";
import { IssueCommentRepository } from "../../data/repositories/interfaces/issue-comment.repository";
import { IssueTaskRepository } from "../../data/repositories/interfaces/issue-task.repository";

import { CoreIssueController } from "../../controllers/core-issue.controller";
import { CoreIssueCommentController } from "../../controllers/core-issue-comment.controller";
import { CoreIssueTaskController } from "../../controllers/core-issue-task.controller";

import { CoreUserService } from "../../services/core-user.service";
import { CoreIssueService } from "../../services/core-issue.service";
import { CoreIssueCommentService } from "../../services/core-issue-comment.service";
import { CoreIssueTaskService } from "../../services/core-issue-task.service";

import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { PostgresIssueRepository } from "../../data/repositories/postgres-issue.repository";
import { PostgresIssueCommentRepository } from "../../data/repositories/postgres-issue-comment.repository";
import { PostgresIssueAssigneeRepository } from "../../data/repositories/postgres-issue-assignee.repository";
import { PostgresIssueTaskRepository } from "../../data/repositories/postgres-issue-task.repository";

import { UserCreatedSubscriber } from "../../messages/subscribers/user-created.subscriber";
import { UserUpdatedSubscriber } from "../../messages/subscribers/user-updated.subscribers";
import { ProjectCreatedSubscriber } from "../../messages/subscribers/project-created.subscriber";
import { ProjectRepository } from "../../data/repositories/interfaces/project.repository";
import { PostgresProjectRepository } from "../../data/repositories/postgres-project.repository";
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
  postgresTypeormStore: TypeormStore;
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

export const container = new AwilixContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = container;

add("logger", asValue(logger));
add("dataSource", asValue(dataSource));
add("postgresTypeormStore", asValue(postgresTypeormStore));
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
