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
import { CoreIssueService } from "../services/core-issue.service";
import { CoreIssueController } from "../controllers/core-issue.controller";
import { PostgresIssueRepository } from "../data/repositories/postgres-issue.repository";
import { PostgresIssueAssigneeRepository } from "../data/repositories/postgres-issue-assignee.repository";
import { IssueController } from "../controllers/interfaces/issue-controller";
import { IssueService } from "../services/interfaces/issue.service";
import { IssueRepository } from "../data/repositories/interfaces/issue.repository";
import { IssueAssigneeRepository } from "../data/repositories/interfaces/issue-assignee.repository";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  databaseService: PostgresService;
  messageService: NatsMessageService;
  issueController: IssueController;
  issueService: IssueService;
  issueRepository: IssueRepository;
  issueAssigneeRepository: IssueAssigneeRepository;
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
add("issueService", asClass(CoreIssueService));
add("issueRepository", asClass(PostgresIssueRepository));
add("issueAssigneeRepository", asClass(PostgresIssueAssigneeRepository));
