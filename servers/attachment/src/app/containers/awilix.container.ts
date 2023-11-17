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
import { IssueAttachmentController } from "../../controllers/interfaces/issue-attachment.controller";
import { IssueAttachmentService } from "../../services/interfaces/issue-attachment.service";
import { IssueAttachmentRepository } from "../../data/repositories/interfaces/issue-attachment.repository";
import { CoreIssueAttachmentController } from "../../controllers/core-issue-attachment.controller";
import { CoreIssueAttachmentService } from "../../services/core-issue-attachment.service";
import { PostgresIssueAttachmentRepository } from "../../data/repositories/postgres-issue-attachment.repository";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  messenger: NatsMessenger;
  postgresTypeormStore: TypeormStore;
  issueAttachmentController: IssueAttachmentController;
  issueAttachmentService: IssueAttachmentService;
  issueAttachmentRepository: IssueAttachmentRepository;
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
add("issueAttachmentController", asClass(CoreIssueAttachmentController));
add("issueAttachmentService", asClass(CoreIssueAttachmentService));
add("issueAttachmentRepository", asClass(PostgresIssueAttachmentRepository));
