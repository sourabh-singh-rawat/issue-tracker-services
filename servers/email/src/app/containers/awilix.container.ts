import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  logger,
  NatsMessenger,
  NodeMailer,
  TypeormStore,
  AwilixContainer,
} from "@sourabhrawatcc/core-utils";
import { DataSource } from "typeorm";
import { dataSource, store } from "../stores/postgres-typeorm.store";
import { natsMessenger } from "../messengers/nats.messenger";
import { brevoNodeMailer } from "../mailers/brevo.nodemailer";
import { EmailService } from "../../services/interfaces/email.service";
import { EmailRepository } from "../../data/repositories/interfaces/email.repository";
import { CoreEmailService } from "../../services/core-email.service";
import { PostgresEmailRepository } from "../../data/repositories/postgres-email.repository";
import { WorkspaceInviteCreatedSubscriber } from "../../messages/subscribers/workspace-invite-created.subscriber";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { UserRepository } from "../../data/repositories/interfaces/user.repository";
import { ProjectMemberCreatedSubscriber } from "../../messages/subscribers/project-member-created.subscriber";
import { UserCreatedSubscriber } from "../../messages/subscribers/user-created.subscriber";
import { EmailCreatedPublisher } from "../../messages/publishers/email-created.publisher";

export interface RegisteredServices {
  logger: Logger;
  store: TypeormStore;
  messenger: NatsMessenger;
  dataSource: DataSource;
  nodeMailer: NodeMailer;
  emailService: EmailService;
  userRepository: UserRepository;
  emailRepository: EmailRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  emailCreatedPublisher: EmailCreatedPublisher;
  projectMemberCreatedSubscriber: ProjectMemberCreatedSubscriber;
  workspaceInviteCreatedSubsciber: WorkspaceInviteCreatedSubscriber;
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
add("messenger", asValue(natsMessenger));
add("nodeMailer", asValue(brevoNodeMailer));
add("store", asValue(store));
add("emailService", asClass(CoreEmailService));
add("userRepository", asClass(PostgresUserRepository));
add("emailRepository", asClass(PostgresEmailRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("emailCreatedPublisher", asClass(EmailCreatedPublisher));
add("projectMemberCreatedSubscriber", asClass(ProjectMemberCreatedSubscriber));
add(
  "workspaceInviteCreatedSubsciber",
  asClass(WorkspaceInviteCreatedSubscriber),
);
