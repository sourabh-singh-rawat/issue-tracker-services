import {
  HttpAuthorizationClient,
  type IAuthorizationClient,
} from "@pine/authorization";
import { NatsPublisher, type IPublisher } from "@pine/events";
import { createGraphQLServer, createHttpServer, type IHttpServer } from "@pine/server";
import { Container } from "inversify";
import path from "node:path";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { logger } from "@/bootstrap/logger";
import { type IOrganizationRepository, type IOrganizationService, OrganizationRepository, OrganizationService } from "@/features/organizations";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";
import { routes } from "@/routes";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container
  .bind<IAuthorizationClient>(TYPES.AuthorizationClient)
  .toConstantValue(new HttpAuthorizationClient({ baseUrl: env.AUTHORIZATION_SERVICE_URL }));
container.bind<IOrganizationRepository>(TYPES.OrganizationRepository).to(OrganizationRepository);
container.bind<IOrganizationService>(TYPES.OrganizationService).to(OrganizationService);

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  createHttpServer({
    config: {
      host: "0.0.0.0",
      port: 5005,
      environment: env.NODE_ENV,
      version: 1,
    },
    cors: { credentials: true, origin: [env.ERP_WEB_URL, env.ADMIN_WEB_URL] },
    cookie: { secret: env.JWT_SECRET },
    openapi: {
      info: {
        title: "Organization Service",
        version: "0.0.0",
        description: "Organization and membership APIs",
        license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
      },
      servers: [{ url: env.ORGANIZATION_SERVICE_URL }],
      tags: [
        { name: "organizations", description: "Organization end-points" },
        { name: "memberships", description: "Membership end-points" },
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

