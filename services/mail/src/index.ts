import "dotenv/config";
import { AppLogger, AwilixDi, logger } from "@issue-tracker/server-core";
import nodemailer from "nodemailer";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { DataSource } from "typeorm";
import { Mailer, NodeMailer } from "@issue-tracker/comm";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { EmailRepository } from "./data/repositories/interfaces/email.repository";
import { UserRegisteredSubscriber } from "./events/subscribers/user-registered.subscriber";
import { ProjectMemberInvitedSubscriber } from "./events/subscribers/project-member-invited.subscriber";
import { WorkspaceMemberInvitedSubscriber } from "./events/subscribers/workspace-member-invited.subscriber";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresEmailRepository } from "./data/repositories/postgres-email.repository";
import { UserEmailService } from "./services/interfaces/user-email.service";
import { CoreUserEmailService } from "./services/core-user-email.service";
import { CoreWorkspaceEmailService } from "./services/core-workspace-email.service";
import { WorkspaceEmailService } from "./services/interfaces/workspace-email.service";
import { ProjectEmailService } from "./services/interfaces/project-email.service";
import { CoreProjectEmailService } from "./services/core-project-email.service";
import { Broker, NatsBroker, NatsPublisher } from "@issue-tracker/event-bus";

export interface RegisteredServices {
  logger: AppLogger;
  orm: Typeorm;
  broker: Broker;
  publisher: NatsPublisher;
  dataSource: DataSource;
  mailer: Mailer;
  userEmailService: UserEmailService;
  projectEmailService: ProjectEmailService;
  workspaceEmailService: WorkspaceEmailService;
  userRepository: UserRepository;
  emailRepository: EmailRepository;
  userRegisteredSubscriber: UserRegisteredSubscriber;
  projectMemberCreatedSubscriber: ProjectMemberInvitedSubscriber;
  workspaceMemberInvitedSubscriber: WorkspaceMemberInvitedSubscriber;
}

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userRegisteredSubscriber").fetchMessages();
  container.get("projectMemberCreatedSubscriber").fetchMessages();
  container.get("workspaceMemberInvitedSubscriber").fetchMessages();
};

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/data/entities/*.ts"],
  synchronize: true,
});

const main = async () => {
  const orm = new PostgresTypeorm(dataSource, logger);
  await orm.init();

  const broker = new NatsBroker({
    servers: [process.env.NATS_SERVER_URL || "nats"],
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
  add("userRepository", asClass(PostgresUserRepository));
  add("emailRepository", asClass(PostgresEmailRepository));
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
