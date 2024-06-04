import {
  AppLogger,
  AwilixDi,
  FastifyServer,
  logger,
} from "@issue-tracker/server-core";
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
import { UserCreatedSubscriber } from "./events/subscribers/user-created.subscriber";
import { EmailCreatedPublisher } from "./events/publishers/email-created.publisher";
import { ProjectMemberCreatedSubscriber } from "./events/subscribers/project-member-created.subscriber";
import { WorkspaceInviteCreatedSubscriber } from "./events/subscribers/workspace-invite-created.subscriber";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresEmailRepository } from "./data/repositories/postgres-email.repository";

export interface RegisteredServices {
  logger: AppLogger;
  orm: Typeorm;
  eventBus: EventBus;
  dataSource: DataSource;
  mailer: Mailer;
  emailService: EmailService;
  userRepository: UserRepository;
  emailRepository: EmailRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  emailCreatedPublisher: EmailCreatedPublisher;
  projectMemberCreatedSubscriber: ProjectMemberCreatedSubscriber;
  workspaceInviteCreatedSubsciber: WorkspaceInviteCreatedSubscriber;
}

const startServer = async () => {
  try {
    const server = new FastifyServer({});
    server.init();
  } catch (error) {
    process.exit(1);
  }
};

const startSubscriptions = (container: AwilixDi<RegisteredServices>) => {
  container.get("userCreatedSubscriber").fetchMessages();
  container.get("projectMemberCreatedSubscriber").fetchMessages();
  container.get("workspaceInviteCreatedSubsciber").fetchMessages();
};

const main = async () => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.host,
    username: process.env.user,
    password: process.env.password,
    database: process.env.dbname,
    entities: ["src/data/entities/*.ts"],
    synchronize: true,
  });

  const orm = new PostgresTypeorm(dataSource, logger);
  orm.init();

  const eventBus = new NatsEventBus({ servers: ["nats"] }, logger);
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
  add("userRepository", asClass(PostgresUserRepository));
  add("emailRepository", asClass(PostgresEmailRepository));
  add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
  add("emailCreatedPublisher", asClass(EmailCreatedPublisher));
  add(
    "projectMemberCreatedSubscriber",
    asClass(ProjectMemberCreatedSubscriber),
  );
  add(
    "workspaceInviteCreatedSubsciber",
    asClass(WorkspaceInviteCreatedSubscriber),
  );
  container.init();

  await startServer();
  startSubscriptions(container);
};

main();
