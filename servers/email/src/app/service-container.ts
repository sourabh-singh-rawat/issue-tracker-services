import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  PostgresService,
  AwilixServiceContainer,
  logger,
  NatsMessageService,
  MailService,
} from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";
import { dataSource, databaseService } from "./database-service";
import { messageService } from "./message-system";
import { WorkspaceInviteCreatedSubscriber } from "../messages/subscribers/workspace-invite-created.subscriber";
import { PostgresEmailRepository } from "../data/repositories/postgres-email.repository";
import { EmailRepository } from "../data/repositories/interfaces/email.repository";
import { BrevoMailService, brevoTransporter } from "./brevo-mail-service";
import { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { CoreEmailService } from "../services/core-email.service";
import { EmailService } from "../services/interfaces/email.service";

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  databaseService: PostgresService;
  messageService: NatsMessageService;
  transporter: Transporter<SMTPTransport.SentMessageInfo>;
  mailService: MailService;
  emailService: EmailService;
  emailRepository: EmailRepository;
  workspaceInviteCreatedSubsciber: WorkspaceInviteCreatedSubscriber;
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
add("transporter", asValue(brevoTransporter));
add("mailService", asClass(BrevoMailService));
add("emailService", asClass(CoreEmailService));
add("emailRepository", asClass(PostgresEmailRepository));
add(
  "workspaceInviteCreatedSubsciber",
  asClass(WorkspaceInviteCreatedSubscriber),
);
