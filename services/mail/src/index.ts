import "dotenv/config";
import { AppLogger, AwilixDi, logger } from "@issue-tracker/server-core";
import nodemailer from "nodemailer";
import { PostgresTypeorm, Typeorm } from "@issue-tracker/orm";
import { EventBus, NatsEventBus } from "@issue-tracker/event-bus";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { EmailService } from "./services/interfaces/email.service";
import { DataSource } from "typeorm";
import { CoreEmailService } from "./services/core-email.service";
import { Mailer, NodeMailer } from "@issue-tracker/comm";
import { UserRepository } from "./data/repositories/interfaces/user.repository";
import { EmailRepository } from "./data/repositories/interfaces/email.repository";
import { UserCreatedSubscriber } from "./events/subscribers/user-registered.subscriber";
import { UserEmailConfirmationSentPublisher } from "./events/publishers/user-email-confirmation-sent.publisher";
import { ProjectMemberCreatedSubscriber } from "./events/subscribers/project-member-created.subscriber";
import { WorkspaceInviteCreatedSubscriber } from "./events/subscribers/workspace-invite-created.subscriber";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresEmailRepository } from "./data/repositories/postgres-email.repository";
import { UserService } from "./services/interfaces/user.service";
import { CoreUserService } from "./services/core-user.service";
import { UserEmailConfirmationRepository } from "./data/repositories/interfaces/user-email-confirmation.repository";
import { PostgresUserEmailConfirmationRepository } from "./data/repositories/postgres-user-confirmation-email.repository";

export interface RegisteredServices {
  logger: AppLogger;
  orm: Typeorm;
  eventBus: EventBus;
  dataSource: DataSource;
  mailer: Mailer;
  emailService: EmailService;
  userService: UserService;
  userRepository: UserRepository;
  emailRepository: EmailRepository;
  userEmailConfirmationRepository: UserEmailConfirmationRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userEmailConfirmationSentPublisher: UserEmailConfirmationSentPublisher;
  projectMemberCreatedSubscriber: ProjectMemberCreatedSubscriber;
  workspaceInviteCreatedSubsciber: WorkspaceInviteCreatedSubscriber;
}

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userCreatedSubscriber").fetchMessages();
  container.get("projectMemberCreatedSubscriber").fetchMessages();
  container.get("workspaceInviteCreatedSubsciber").fetchMessages();
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

  const eventBus = new NatsEventBus({
    servers: [process.env.NATS_SERVER_URL || "nats"],
    streams: ["email"],
    logger,
  });
  await eventBus.init();

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
  add("eventBus", asValue(eventBus));
  add("mailer", asValue(mailer));
  add("orm", asValue(orm));
  add("emailService", asClass(CoreEmailService));
  add("userService", asClass(CoreUserService));
  add("userRepository", asClass(PostgresUserRepository));
  add("emailRepository", asClass(PostgresEmailRepository));
  add(
    "userEmailConfirmationRepository",
    asClass(PostgresUserEmailConfirmationRepository),
  );
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add(
    "userEmailConfirmationSentPublisher",
    asClass(UserEmailConfirmationSentPublisher),
  );
  add(
    "projectMemberCreatedSubscriber",
    asClass(ProjectMemberCreatedSubscriber),
  );
  add(
    "workspaceInviteCreatedSubsciber",
    asClass(WorkspaceInviteCreatedSubscriber),
  );
  container.init();

  startSubscriptions(container);
};

main();
