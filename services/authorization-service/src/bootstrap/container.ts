import {
  HttpAuthorizationClient,
  type IAuthorizationClient,
} from "@pine/authorization";
import type { IBroker } from "@pine/events";
import { createHttpServer, type IHttpServer } from "@pine/server";
import { Container } from "inversify";
import path from "node:path";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { env } from "@/bootstrap/env";
import { ketoClient } from "@/bootstrap/keto-client";
import { logger } from "@/bootstrap/logger";
import { AuthorizationService, type IAuthorizationService } from "@/features/authorization";
import {
  PlatformMemberSyncConsumer,
  PlatformRoleCapabilitySyncConsumer,
  TenantMemberSyncConsumer,
} from "@/features/platform";

import {
  KetoAuthorizationGraphProvider,
  type IAuthorizationGraphProvider,
  KetoClient,
} from "@/integrations/authorization";
import { routes } from "@/routes";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Logger).toConstantValue(logger);
container.bind<IBroker>(TYPES.Broker).toConstantValue(broker);
container.bind<KetoClient>(TYPES.KetoClient).toConstantValue(ketoClient);
container
  .bind<IAuthorizationGraphProvider>(TYPES.AuthorizationGraphProvider)
  .to(KetoAuthorizationGraphProvider);
container.bind<IAuthorizationService>(TYPES.AuthorizationService).to(AuthorizationService);
container
  .bind<IAuthorizationClient>(TYPES.AuthorizationClient)
  .toConstantValue(new HttpAuthorizationClient({ baseUrl: env.AUTHORIZATION_SERVICE_URL }));
container
  .bind<PlatformRoleCapabilitySyncConsumer>(TYPES.PlatformRoleCapabilitySyncConsumer)
  .to(PlatformRoleCapabilitySyncConsumer);
container
  .bind<PlatformMemberSyncConsumer>(TYPES.PlatformMemberSyncConsumer)
  .to(PlatformMemberSyncConsumer);
container
  .bind<TenantMemberSyncConsumer>(TYPES.TenantMemberSyncConsumer)
  .to(TenantMemberSyncConsumer);


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
        description: "Authorization graph APIs (Ory Keto)",
        license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
      },
      servers: [{ url: env.AUTHORIZATION_SERVICE_URL }],
      tags: [{ name: "authorization", description: "Authorization graph end-points" }],
    },
    routes,
  }),
);

export const openApiOutputPath = path.join(process.cwd(), "dist", "openapi.json");
