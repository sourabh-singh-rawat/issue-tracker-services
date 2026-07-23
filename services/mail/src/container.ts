import "./env";

import { Mailer, NodeMailer } from "@pine/comm";
import { Broker, NatsBroker, NatsPublisher } from "@pine/event-bus";
import { PostgresTypeorm, Typeorm } from "@pine/orm";
import { AwilixDi, CoreLogger, Logger } from "@pine/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import nodemailer from "nodemailer";
import pino from "pino";
import { DataSource } from "typeorm";
import { CoreProjectEmailService, ProjectEmailService, ProjectMemberInvitedSubscriber } from "@/features/project-email";
import { CoreUserEmailService, UserEmailService, UserRegisteredSubscriber } from "@/features/user-email";
import { CoreWorkspaceEmailService, WorkspaceEmailService, WorkspaceMemberInvitedSubscriber } from "@/features/workspace-email";

export const logger = new CoreLogger(pino({ transport: { target: "pino-pretty" } }));

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.MAIL_POSTGRES_CLUSTER_URL,
  entities: ["src/features/**/entities/*.{ts,js}"],
  synchronize: true,
});

export const orm = new PostgresTypeorm(dataSource, logger);

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
  streams: ["email"],
  logger,
});

const brevoTransporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: { user: process.env.BREVO_EMAIL, pass: process.env.BREVO_SECRET },
});

export const mailer = new NodeMailer(brevoTransporter);

export interface RegisteredServices {
  logger: Logger;
  orm: Typeorm;
  broker: Broker;
  publisher: NatsPublisher;
  dataSource: DataSource;
  mailer: Mailer;
  userEmailService: UserEmailService;
  projectEmailService: ProjectEmailService;
  workspaceEmailService: WorkspaceEmailService;
  userRegisteredSubscriber: UserRegisteredSubscriber;
  projectMemberCreatedSubscriber: ProjectMemberInvitedSubscriber;
  workspaceMemberInvitedSubscriber: WorkspaceMemberInvitedSubscriber;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});

export const container = new AwilixDi<RegisteredServices>(awilix, logger);

container.add("logger", asValue(logger));
container.add("dataSource", asValue(dataSource));
container.add("broker", asValue(broker));
container.add("mailer", asValue(mailer));
container.add("orm", asValue(orm));
container.add("publisher", asClass(NatsPublisher));
container.add("userEmailService", asClass(CoreUserEmailService));
container.add("projectEmailService", asClass(CoreProjectEmailService));
container.add("workspaceEmailService", asClass(CoreWorkspaceEmailService));
container.add("userRegisteredSubscriber", asClass(UserRegisteredSubscriber));
container.add("projectMemberCreatedSubscriber", asClass(ProjectMemberInvitedSubscriber));
container.add("workspaceMemberInvitedSubscriber", asClass(WorkspaceMemberInvitedSubscriber));
