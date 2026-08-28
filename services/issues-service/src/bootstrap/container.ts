import { NatsPublisher, type IPublisher } from "@pine/events";
import { resolveIdentityFromHeaders } from "@pine/identity";
import { createGraphQLServer, createHttpServer, readTlsFile, type IHttpServer } from "@pine/server";
import {
  ExponentialBackoffPolicy,
  OutboxCleanupService,
  OutboxCleanupWorker,
  OutboxRepository,
  OutboxService,
  OutboxWorker,
  type IOutboxCleanupService,
  type IOutboxCleanupWorker,
  type IOutboxPublisher,
  type IOutboxRepository,
  type IOutboxService,
  type IOutboxWorker,
  type IRetryPolicy,
} from "@pine/outbox";
import { Container } from "inversify";
import path from "node:path";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { logger } from "@/bootstrap/logger";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";
import { IIdentityRepository, IdentityRepository, IssuesIdentitySyncConsumer } from "@/features/identities";
import { IIssueAssigneeRepository, IIssueRepository, IIssueService, IssueAssigneeRepository, IssueRepository, IssueService } from "@/features/issue";
import { IProjectRepository, IProjectService, ProjectRepository, ProjectService } from "@/features/project";
import { IStatusRepository, IStatusService, StatusRepository, StatusService } from "@/features/status";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container.bind<IOutboxRepository>(TYPES.OutboxRepository).toConstantValue(new OutboxRepository(db));
container.bind<IRetryPolicy>(TYPES.RetryPolicy).toConstantValue(new ExponentialBackoffPolicy());
container
  .bind<IOutboxService>(TYPES.OutboxService)
  .toConstantValue(new OutboxService(container.get<IOutboxRepository>(TYPES.OutboxRepository), container.get<IRetryPolicy>(TYPES.RetryPolicy)));
container
  .bind<IOutboxWorker>(TYPES.OutboxWorker)
  .toConstantValue(new OutboxWorker(container.get<IOutboxService>(TYPES.OutboxService), container.get<IPublisher>(TYPES.Publisher) as IOutboxPublisher));
container
  .bind<IOutboxCleanupService>(TYPES.OutboxCleanupService)
  .toConstantValue(new OutboxCleanupService(container.get<IOutboxRepository>(TYPES.OutboxRepository)));
container
  .bind<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker)
  .toConstantValue(new OutboxCleanupWorker(container.get<IOutboxCleanupService>(TYPES.OutboxCleanupService)));

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IIssueRepository>(TYPES.IssueRepository).to(IssueRepository);
container.bind<IIssueAssigneeRepository>(TYPES.IssueAssigneeRepository).to(IssueAssigneeRepository);
container.bind<IIssueService>(TYPES.IssueService).to(IssueService);
container.bind<IStatusRepository>(TYPES.StatusRepository).to(StatusRepository);
container.bind<IStatusService>(TYPES.StatusService).to(StatusService);
container.bind<IProjectRepository>(TYPES.ProjectRepository).to(ProjectRepository);
container.bind<IProjectService>(TYPES.ProjectService).to(ProjectService);
container.bind<IssuesIdentitySyncConsumer>(TYPES.IssuesIdentitySyncConsumer).to(IssuesIdentitySyncConsumer);

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  createHttpServer({
    config: {
      host: "0.0.0.0",
      port: 5001,
      environment: env.NODE_ENV,
      version: 1,
    },
    https: {
      key: readTlsFile(env.ISSUES_SERVICE_TLS_KEY_PATH),
      cert: readTlsFile(env.ISSUES_SERVICE_TLS_CERT_PATH),
    },
    cookie: { secret: env.JWT_SECRET },
    hooks: {
      onRequest: [resolveIdentityFromHeaders],
    },
    graphql: createGraphQLServer({
      schema,
      context: createContext,
    }),
    routes: [],
  }),
);

