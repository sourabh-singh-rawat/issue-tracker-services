import { NatsPublisher, type IPublisher } from "@pine/events";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import { mailer } from "@/bootstrap/mailer";
import {
  IProjectEmailService,
  ProjectEmailService,
  ProjectMemberInviteConsumer,
} from "@/features/project-email";
import {
  EmailRepository,
  IEmailRepository,
  IUserEmailService,
  UserEmailService,
  UserRegisteredConsumer,
} from "@/features/user-email";
import {
  IIdentityRepository,
  IdentityRepository,
  IdentitySyncConsumer,
} from "@/features/identities";
import type { IMailer } from "@/integrations/email";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container.bind<IMailer>(TYPES.Mailer).toConstantValue(mailer);

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IEmailRepository>(TYPES.EmailRepository).to(EmailRepository);
container.bind<IUserEmailService>(TYPES.UserEmailService).to(UserEmailService);
container.bind<IProjectEmailService>(TYPES.ProjectEmailService).to(ProjectEmailService);

container.bind<UserRegisteredConsumer>(TYPES.UserRegisteredConsumer).to(UserRegisteredConsumer);
container.bind<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).to(IdentitySyncConsumer);
container
  .bind<ProjectMemberInviteConsumer>(TYPES.ProjectMemberInviteConsumer)
  .to(ProjectMemberInviteConsumer);
