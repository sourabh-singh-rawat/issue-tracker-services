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
import { messageService } from "./message-system";
import { WorkspaceInviteCreatedSubscriber } from "../messages/subscribers/workspace-invite-created.subscriber";
import { PostgresSentEmailRepository } from "../data/repositories/postgres-sent-email.repository";
import { SentEmailRepository } from "../data/repositories/interfaces/sent-email.repository";
import { BrevoMailService, transporter } from "./brevo-mail-service";
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  databaseService: PostgresService;
  messageService: NatsMessageService;
  workspaceInviteCreatedSubsciber: WorkspaceInviteCreatedSubscriber;
  sentEmailRepository: SentEmailRepository;
  transporter: Transporter<SMTPTransport.SentMessageInfo>;
  nodeMailer: BrevoMailService;
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
add("transporter", asValue(transporter));
add("sentEmailRepository", asClass(PostgresSentEmailRepository));
add(
  "workspaceInviteCreatedSubsciber",
  asClass(WorkspaceInviteCreatedSubscriber),
);
add("nodeMailer", asClass(BrevoMailService));
