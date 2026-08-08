import { NatsPublisher, type IPublisher } from "@pine/events";
import { FastifyHttpServer, type IHttpServer } from "@pine/http";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { fastifyServer } from "@/bootstrap/fastify";
import { logger } from "@/bootstrap/logger";
import {
  type IOrganizationRepository,
  type IOrganizationService,
  OrganizationRepository,
  OrganizationService,
} from "@/features/organizations";
import { routes } from "@/routes";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container
  .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
  .to(OrganizationRepository);
container.bind<IOrganizationService>(TYPES.OrganizationService).to(OrganizationService);

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  new FastifyHttpServer(fastifyServer, {
    config: {
      host: "0.0.0.0",
      port: 5005,
      environment: env.NODE_ENV,
      version: 1,
    },
    cors: { credentials: true, origin: [env.ERP_WEB_URL, env.ADMIN_WEB_URL] },
    cookie: { secret: env.JWT_SECRET },
    routes,
  }),
);
