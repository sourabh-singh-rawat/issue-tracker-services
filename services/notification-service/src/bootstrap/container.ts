import { NatsPublisher, type IPublisher } from "@pine/events";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { dataSource } from "@/bootstrap/data-source";
import { logger } from "@/bootstrap/logger";
import { mailer } from "@/bootstrap/mailer";
import { orm } from "@/bootstrap/orm";
import { IProjectEmailService, ProjectEmailService, ProjectMemberInviteConsumer } from "@/features/project-email";
import { IUserEmailService, UserEmailService, UserRegisteredConsumer } from "@/features/user-email";
import type { IMailer } from "@/integrations/email";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind(TYPES.Orm).toConstantValue(orm);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container.bind<IMailer>(TYPES.Mailer).toConstantValue(mailer);

container.bind<IUserEmailService>(TYPES.UserEmailService).to(UserEmailService);
container.bind<IProjectEmailService>(TYPES.ProjectEmailService).to(ProjectEmailService);

container.bind<UserRegisteredConsumer>(TYPES.UserRegisteredConsumer).to(UserRegisteredConsumer);
container.bind<ProjectMemberInviteConsumer>(TYPES.ProjectMemberInviteConsumer).to(ProjectMemberInviteConsumer);
