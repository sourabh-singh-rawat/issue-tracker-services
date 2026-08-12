import {
  HttpAuthorizationClient,
  type IAuthorizationClient,
} from "@pine/authorization";
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
import { createGraphQLServer, createHttpServer, type IHttpServer } from "@pine/server";
import { Container } from "inversify";
import path from "node:path";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { logger } from "@/bootstrap/logger";
import {
  type IOrganizationRepository,
  type IOrganizationService,
  OrganizationRepository,
  OrganizationService,
} from "@/features/organizations";
import {
  type IPlatformRoleAssignmentRepository,
  type IPlatformRoleAssignmentService,
  PlatformRoleAssignmentRepository,
  PlatformRoleAssignmentService,
} from "@/features/platformRoleAssignments";
import {
  type IPlatformRoleRepository,
  type IPlatformRoleService,
  PlatformRoleRepository,
  PlatformRoleService,
} from "@/features/platformRoles";
import {
  type ICapabilityRepository,
  type ICapabilityService,
  CapabilityRepository,
  CapabilityService,
} from "@/features/capabilities";
import { type ITenantRepository, type ITenantService, TenantRepository, TenantService } from "@/features/tenants";
import { createContext } from "@/graphql";
import { routes } from "@/routes";

export const container = new Container({ defaultScope: "Singleton" });

const publisher = new NatsPublisher(broker);

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(publisher);
container
  .bind<IOutboxRepository>(TYPES.OutboxRepository)
  .toConstantValue(new OutboxRepository(db));
container.bind<IRetryPolicy>(TYPES.RetryPolicy).toConstantValue(new ExponentialBackoffPolicy());
container
  .bind<IOutboxService>(TYPES.OutboxService)
  .toConstantValue(
    new OutboxService(
      container.get<IOutboxRepository>(TYPES.OutboxRepository),
      container.get<IRetryPolicy>(TYPES.RetryPolicy),
    ),
  );
container
  .bind<IOutboxWorker>(TYPES.OutboxWorker)
  .toConstantValue(
    new OutboxWorker(
      container.get<IOutboxService>(TYPES.OutboxService),
      publisher satisfies IOutboxPublisher,
    ),
  );
container
  .bind<IOutboxCleanupService>(TYPES.OutboxCleanupService)
  .toConstantValue(
    new OutboxCleanupService(container.get<IOutboxRepository>(TYPES.OutboxRepository)),
  );
container
  .bind<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker)
  .toConstantValue(
    new OutboxCleanupWorker(container.get<IOutboxCleanupService>(TYPES.OutboxCleanupService)),
  );
container
  .bind<IAuthorizationClient>(TYPES.AuthorizationClient)
  .toConstantValue(new HttpAuthorizationClient({ baseUrl: env.AUTHORIZATION_SERVICE_URL }));
container.bind<ITenantRepository>(TYPES.TenantRepository).to(TenantRepository);
container.bind<ITenantService>(TYPES.TenantService).to(TenantService);
container.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(OrganizationRepository);
container.bind<IOrganizationService>(TYPES.OrganizationService).to(OrganizationService);
container.bind<IPlatformRoleRepository>(TYPES.PlatformRoleRepository).to(PlatformRoleRepository);
container.bind<IPlatformRoleService>(TYPES.PlatformRoleService).to(PlatformRoleService);
container
  .bind<IPlatformRoleAssignmentRepository>(TYPES.PlatformRoleAssignmentRepository)
  .to(PlatformRoleAssignmentRepository);
container
  .bind<IPlatformRoleAssignmentService>(TYPES.PlatformRoleAssignmentService)
  .to(PlatformRoleAssignmentService);
container.bind<ICapabilityRepository>(TYPES.CapabilityRepository).to(CapabilityRepository);
container.bind<ICapabilityService>(TYPES.CapabilityService).to(CapabilityService);

export const bindHttpServer = async (): Promise<void> => {
  const { schema } = await import("@/graphql/schema");

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
          description: "Tenant, organization, membership, and capability catalog APIs",
          license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
        },
        servers: [{ url: env.PLATFORM_SERVICE_URL }],
        tags: [
          { name: "tenants", description: "Tenant end-points" },
          { name: "organizations", description: "Organization end-points" },
          { name: "memberships", description: "Membership end-points" },
          { name: "capabilities", description: "Capability catalog end-points" },
        ],
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
