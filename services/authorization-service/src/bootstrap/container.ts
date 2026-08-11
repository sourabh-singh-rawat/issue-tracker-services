import {
  HttpAuthorizationClient,
  type IAuthorizationClient,
} from "@pine/authorization";
import { NatsPublisher, type IPublisher } from "@pine/events";
import { createGraphQLServer, createHttpServer, type IHttpServer } from "@pine/server";
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
import { ketoClient } from "@/bootstrap/keto-client";
import { logger } from "@/bootstrap/logger";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";
import { AuthorizationService, type IAuthorizationService } from "@/features/authorization";
import { CapabilityRepository, type ICapabilityRepository, CapabilityService, type ICapabilityService } from "@/features/capabilities";
import { IdentityRepository, type IIdentityRepository, IdentitySyncConsumer } from "@/features/identities";
import { ResourceRepository, type IResourceRepository } from "@/features/resources";
import {
  RoleAssignmentKetoSyncConsumer,
  RoleCapabilityKetoSyncConsumer,
  RoleAssignmentRepository,
  type IRoleAssignmentRepository,
  RoleAssignmentService,
  type IRoleAssignmentService,
  RoleCapabilityRepository,
  type IRoleCapabilityRepository,
  RoleRepository,
  type IRoleRepository,
  RoleService,
  type IRoleService,
} from "@/features/roles";
import { KetoAuthorizationGraphProvider, type IAuthorizationGraphProvider, KetoClient } from "@/integrations/authorization";
import { routes } from "@/routes";

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
container.bind<KetoClient>(TYPES.KetoClient).toConstantValue(ketoClient);
container.bind<IAuthorizationGraphProvider>(TYPES.AuthorizationGraphProvider).to(KetoAuthorizationGraphProvider);
container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).to(IdentitySyncConsumer);
container.bind<IResourceRepository>(TYPES.ResourceRepository).to(ResourceRepository);
container.bind<IRoleRepository>(TYPES.RoleRepository).to(RoleRepository);
container.bind<IRoleCapabilityRepository>(TYPES.RoleCapabilityRepository).to(RoleCapabilityRepository);
container.bind<IRoleAssignmentRepository>(TYPES.RoleAssignmentRepository).to(RoleAssignmentRepository);
container.bind<IRoleAssignmentService>(TYPES.RoleAssignmentService).to(RoleAssignmentService);
container.bind<RoleAssignmentKetoSyncConsumer>(TYPES.RoleAssignmentKetoSyncConsumer).to(RoleAssignmentKetoSyncConsumer);
container.bind<RoleCapabilityKetoSyncConsumer>(TYPES.RoleCapabilityKetoSyncConsumer).to(RoleCapabilityKetoSyncConsumer);

container.bind<IRoleService>(TYPES.RoleService).to(RoleService);
container.bind<ICapabilityRepository>(TYPES.CapabilityRepository).to(CapabilityRepository);
container.bind<ICapabilityService>(TYPES.CapabilityService).to(CapabilityService);
container.bind<IAuthorizationService>(TYPES.AuthorizationService).to(AuthorizationService);
container
  .bind<IAuthorizationClient>(TYPES.AuthorizationClient)
  .toConstantValue(new HttpAuthorizationClient({ baseUrl: env.AUTHORIZATION_SERVICE_URL }));

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  createHttpServer({
    config: {
      host: "0.0.0.0",
      port: 5006,
      environment: env.NODE_ENV,
      version: 1,
    },
    cors: { credentials: true, origin: env.ERP_WEB_URL },
    cookie: { secret: env.JWT_SECRET },
    openapi: {
      info: {
        title: "Authorization Service",
        version: "0.0.0",
        description: "Roles and authorization APIs",
        license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
      },
      servers: [{ url: env.AUTHORIZATION_SERVICE_URL }],
      tags: [
        { name: "authorization", description: "Authorization check end-points" },
        { name: "roles", description: "Role end-points" },
        { name: "capabilities", description: "Capability end-points" },
      ],

    },
    graphql: createGraphQLServer({
      schema,
      context: createContext,
    }),
    routes,
  }),
);

export const openApiOutputPath = path.join(process.cwd(), "dist", "openapi.json");

