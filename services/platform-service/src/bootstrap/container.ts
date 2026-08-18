import { HttpAuthorizationClient, type IAuthorizationClient } from "@pine/authorization";
import { NatsPublisher, type IPublisher } from "@pine/events";
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
import { HttpIdentityClient } from "@pine/identity";
import { createGraphQLServer, createHttpServer, type IHttpServer } from "@pine/server";
import { Container } from "inversify";
import path from "node:path";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { logger } from "@/bootstrap/logger";
import {
  type IOrganizationRelationService,
  type IOrganizationRepository,
  type IOrganizationService,
  OrganizationRelationService,
  OrganizationRepository,
  OrganizationService,
} from "@/features/organizations";
import { type IPlatformRelationService, PlatformRelationService } from "@/features/platform";
import { type IIdentityRepository, type IIdentityService, IdentityRepository, IdentityService, IdentitySyncConsumer } from "@/features/identities";
import { type ITenantRelationService, TenantRelationService, type ITenantRepository, type ITenantService, TenantRepository } from "@/features/tenants";
import { TenantService } from "@/features/tenants/services/TenantService";
import { createContext } from "@/graphql";
import { routes } from "@/routes";

export const container = new Container({ defaultScope: "Singleton" });

const publisher = new NatsPublisher(broker);

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(publisher);
container.bind<IOutboxRepository>(TYPES.OutboxRepository).toConstantValue(new OutboxRepository(db));
container.bind<IRetryPolicy>(TYPES.RetryPolicy).toConstantValue(new ExponentialBackoffPolicy());
container
  .bind<IOutboxService>(TYPES.OutboxService)
  .toConstantValue(new OutboxService(container.get<IOutboxRepository>(TYPES.OutboxRepository), container.get<IRetryPolicy>(TYPES.RetryPolicy)));
container
  .bind<IOutboxWorker>(TYPES.OutboxWorker)
  .toConstantValue(new OutboxWorker(container.get<IOutboxService>(TYPES.OutboxService), publisher satisfies IOutboxPublisher));
container
  .bind<IOutboxCleanupService>(TYPES.OutboxCleanupService)
  .toConstantValue(new OutboxCleanupService(container.get<IOutboxRepository>(TYPES.OutboxRepository)));
container
  .bind<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker)
  .toConstantValue(new OutboxCleanupWorker(container.get<IOutboxCleanupService>(TYPES.OutboxCleanupService)));
container.bind<IAuthorizationClient>(TYPES.AuthorizationClient).toConstantValue(new HttpAuthorizationClient({ baseUrl: env.AUTHORIZATION_SERVICE_URL }));
container.bind<ITenantRepository>(TYPES.TenantRepository).to(TenantRepository);
container.bind<ITenantService>(TYPES.TenantService).to(TenantService);
container.bind<ITenantRelationService>(TYPES.TenantRelationService).to(TenantRelationService);
container.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(OrganizationRepository);
container.bind<IOrganizationService>(TYPES.OrganizationService).to(OrganizationService);
container.bind<IOrganizationRelationService>(TYPES.OrganizationRelationService).to(OrganizationRelationService);
container.bind<IPlatformRelationService>(TYPES.PlatformRelationService).to(PlatformRelationService);
container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IIdentityService>(TYPES.IdentityService).to(IdentityService);
container.bind(TYPES.IdentitySyncConsumer).to(IdentitySyncConsumer);

export const bindHttpServer = async (): Promise<void> => {
  const { schema } = await import("@/graphql/schema");
  const identityClient = new HttpIdentityClient({ baseUrl: env.IDENTITY_SERVICE_URL });

  container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
    createHttpServer({
      config: {
        host: "0.0.0.0",
        port: 5005,
        environment: env.NODE_ENV,
        version: 1,
      },
      cors: { credentials: true, origin: [env.ERP_WEB_URL, env.VITE_PLATFORM_WEB_URL] },
      cookie: { secret: env.JWT_SECRET },
      openapi: {
        info: {
          title: "Platform Service",
          version: "0.0.0",
          description: "Tenant, organization, and platform member APIs",
          license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
        },
        servers: [{ url: env.PLATFORM_SERVICE_URL }],
        tags: [
          { name: "tenants", description: "Tenant end-points" },
          { name: "tenant-members", description: "Tenant member end-points" },
          { name: "organizations", description: "Organization end-points" },
          { name: "platform-relations", description: "Platform relation end-points" },
          { name: "organization-relations", description: "Organization relation end-points" },
        ],
      },
      hooks: {
        onRequest: [(request) => identityClient.resolveRequestUser(request)],
      },
      graphql: createGraphQLServer({
        schema,
        context: createContext,
      }),
      routes,
    }),
  );
};

export const openApiOutputPath = path.join(process.cwd(), "dist", "openapi.json");
