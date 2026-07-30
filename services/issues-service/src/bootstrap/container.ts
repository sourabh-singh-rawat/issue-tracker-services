import { NatsPublisher, type IPublisher } from "@pine/events";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { dataSource } from "@/bootstrap/data-source";
import { logger } from "@/bootstrap/logger";
import { orm } from "@/bootstrap/orm";
import { IIssueService, IssueService } from "@/features/issue";
import { IProjectService, ProjectService } from "@/features/project";
import { IStatusService, StatusService } from "@/features/status";
import { IUserService, UserService, UserSyncConsumer } from "@/features/user";
import { IWorkspaceService, WorkspaceService } from "@/features/workspace";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind(TYPES.Orm).toConstantValue(orm);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));

container.bind<IUserService>(TYPES.UserService).to(UserService);
container.bind<IIssueService>(TYPES.IssueService).to(IssueService);
container.bind<IStatusService>(TYPES.StatusService).to(StatusService);
container.bind<IProjectService>(TYPES.ProjectService).to(ProjectService);
container.bind<IWorkspaceService>(TYPES.WorkspaceService).to(WorkspaceService);
container.bind<UserSyncConsumer>(TYPES.UserSyncConsumer).to(UserSyncConsumer);
