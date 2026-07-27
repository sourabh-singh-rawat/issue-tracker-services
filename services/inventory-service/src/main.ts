import { env, listenPortFromUrl } from "@/bootstrap/env";
import "reflect-metadata";

import swagger from "@fastify/swagger";
import { initializeObservability } from "@pine/observability";
import { FastifyHttpServer } from "@pine/http-core";
import fastify, { type FastifyInstance } from "fastify";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { broker, initializeDb, logger } from "@/bootstrap";
import { routes } from "@/routes";

export { container, db } from "@/bootstrap";

const writeOpenApiToDist = (instance: FastifyInstance) => {
  const openapi = instance.swagger({ yaml: false });
  const openapiPath = path.join(process.cwd(), "dist", "openapi.json");
  mkdirSync(path.dirname(openapiPath), { recursive: true });
  writeFileSync(openapiPath, JSON.stringify(openapi, null, 2));
};

const main = async () => {
  const observability = initializeObservability({
    enabled: true,
    serviceName: "inventory-service",
    serviceVersion: "0.0.0",
    environment: env.NODE_ENV,
    serviceNamespace: "pine",
    otlpEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  });
  observability?.start();

  await initializeDb();
  await broker.init();

  const instance = fastify();
  const port = listenPortFromUrl(env.INVENTORY_SERVICE_URL);

  const server = new FastifyHttpServer({
    server: instance,
    config: { host: "0.0.0.0", port, environment: "development", version: 1 },
    cors: { credentials: true, origin: env.ERP_WEB_URL },
    cookie: { secret: env.JWT_SECRET },
    routes,
    logger,
  });

  await instance.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Inventory Service",
        version: "0.0.0",
        description: "Inventory APIs",
        license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
      },
      servers: [{ url: env.INVENTORY_SERVICE_URL }],
      tags: [{ name: "auth", description: "Authentication related end-points" }],
    },
  });

  await server.start();
  writeOpenApiToDist(instance);
};

main().catch((error) => {
  console.log(error);
});
