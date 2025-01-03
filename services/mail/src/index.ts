import { config } from "dotenv";
config({ path: "../../.env" });

import { Mailer, NodeMailer } from "@issue-tracker/comm";
import { Broker, NatsBroker, NatsPublisher } from "@issue-tracker/event-bus";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { AwilixDi, CoreLogger, Logger } from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import nodemailer from "nodemailer";
import pino from "pino";
import { DataSource } from "typeorm";
import { ProjectMemberInvitedSubscriber } from "./events/subscribers/project-member-invited.subscriber";
import { UserRegisteredSubscriber } from "./events/subscribers/user-registered.subscriber";
import { WorkspaceMemberInvitedSubscriber } from "./events/subscribers/workspace-member-invited.subscriber";
import { CoreProjectEmailService } from "./services/core-project-email.service";
import { CoreUserEmailService } from "./services/core-user-email.service";
import { CoreWorkspaceEmailService } from "./services/core-workspace-email.service";
import { ProjectEmailService } from "./services/interfaces/project-email.service";
import { UserEmailService } from "./services/interfaces/user-email.service";
import { WorkspaceEmailService } from "./services/interfaces/workspace-email.service";

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

const logger = new CoreLogger(pino({ transport: { target: "pino-pretty" } }));

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userRegisteredSubscriber").fetchMessages();
  container.get("projectMemberCreatedSubscriber").fetchMessages();
  container.get("workspaceMemberInvitedSubscriber").fetchMessages();
};

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.MAIL_POSTGRES_CLUSTER_URL,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

const main = async () => {
  const orm = new PostgresTypeorm(dataSource, logger);
  await orm.init();

  const broker = new NatsBroker({
    servers: [process.env.NATS_CLUSTER_URL!],
    streams: ["email"],
    logger,
  });
  await broker.init();

  const brevoTransporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: { user: process.env.BREVO_EMAIL, pass: process.env.BREVO_SECRET },
  });

  const mailer = new NodeMailer(brevoTransporter);

  const awilix = createContainer<RegisteredServices>({
    injectionMode: InjectionMode.CLASSIC,
  });

  const container = new AwilixDi<RegisteredServices>(awilix, logger);
  const { add } = container;
  add("logger", asValue(logger));
  add("dataSource", asValue(dataSource));
  add("broker", asValue(broker));
  add("mailer", asValue(mailer));
  add("orm", asValue(orm));
  add("publisher", asClass(NatsPublisher));
  add("userEmailService", asClass(CoreUserEmailService));
  add("projectEmailService", asClass(CoreProjectEmailService));
  add("workspaceEmailService", asClass(CoreWorkspaceEmailService));
  add("userRegisteredSubscriber", asClass(UserRegisteredSubscriber));
  add(
    "projectMemberCreatedSubscriber",
    asClass(ProjectMemberInvitedSubscriber),
  );
  add(
    "workspaceMemberInvitedSubscriber",
    asClass(WorkspaceMemberInvitedSubscriber),
  );
  container.init();

  startSubscriptions(container);
};

main();
