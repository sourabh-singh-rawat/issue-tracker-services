import { Mailer } from "@pine/comm";
import { NatsPublisher } from "@pine/event-bus";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { dataSource } from "@/bootstrap/data-source";
import { logger } from "@/bootstrap/logger";
import { mailer } from "@/bootstrap/mailer";
import { orm } from "@/bootstrap/orm";
import {
  IProjectEmailService,
  ProjectEmailService,
  ProjectMemberInvitedSubscriber,
} from "@/features/project-email";
import {
  IUserEmailService,
  UserEmailService,
  UserRegisteredSubscriber,
} from "@/features/user-email";
import {
  IWorkspaceEmailService,
  WorkspaceEmailService,
  WorkspaceMemberInvitedSubscriber,
} from "@/features/workspace-email";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind(TYPES.Orm).toConstantValue(orm);
container.bind(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container.bind<Mailer>(TYPES.Mailer).toConstantValue(mailer);

container.bind<IUserEmailService>(TYPES.UserEmailService).to(UserEmailService);
container.bind<IProjectEmailService>(TYPES.ProjectEmailService).to(ProjectEmailService);
container.bind<IWorkspaceEmailService>(TYPES.WorkspaceEmailService).to(WorkspaceEmailService);

container
  .bind<UserRegisteredSubscriber>(TYPES.UserRegisteredSubscriber)
  .to(UserRegisteredSubscriber);
container
  .bind<ProjectMemberInvitedSubscriber>(TYPES.ProjectMemberInvitedSubscriber)
  .to(ProjectMemberInvitedSubscriber);
container
  .bind<WorkspaceMemberInvitedSubscriber>(TYPES.WorkspaceMemberInvitedSubscriber)
  .to(WorkspaceMemberInvitedSubscriber);
