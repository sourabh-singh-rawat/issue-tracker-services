import { env, listenPortFromUrl } from "@/bootstrap/env";
import "reflect-metadata";

import { ApolloServer, type BaseContext } from "@apollo/server";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import swagger from "@fastify/swagger";
import { FastifyHttpServer } from "@pine/http-core";
import { initializeObservability } from "@pine/observability";
import fastify, { type FastifyInstance } from "fastify";
import { lexicographicSortSchema, printSchema } from "graphql";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { IOutboxCleanupWorker, IOutboxWorker } from "@pine/outbox";
import { broker, container, initializeDb, logger, TYPES } from "@/bootstrap";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";
import { routes } from "@/routes";

export { container, db } from "@/bootstrap";
export { builder, createContext } from "@/graphql";
export type { AuthContext } from "@/graphql";
export { schema } from "@/graphql/schema";

const writeSchemaToDist = () => {
  const schemaPath = path.join(process.cwd(), "dist", "schema.graphql");
  mkdirSync(path.dirname(schemaPath), { recursive: true });
  writeFileSync(schemaPath, printSchema(lexicographicSortSchema(schema)));
};

const writeOpenApiToDist = (instance: FastifyInstance) => {
  const openapi = instance.swagger({ yaml: false });
  const openapiPath = path.join(process.cwd(), "dist", "openapi.json");
  mkdirSync(path.dirname(openapiPath), { recursive: true });
  writeFileSync(openapiPath, JSON.stringify(openapi, null, 2));
};

const main = async () => {
  const observability = initializeObservability({
    enabled: true,
    serviceName: "product-service",
    serviceVersion: "0.0.0",
    environment: env.NODE_ENV,
    serviceNamespace: "pine",
    otlpEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  });
  observability?.start();

  await initializeDb();
  await broker.init();

  const outboxWorker = container.get<IOutboxWorker>(TYPES.OutboxWorker);
  outboxWorker.start();

  const outboxCleanupWorker = container.get<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker);
  outboxCleanupWorker.start();

  writeSchemaToDist();

  const instance = fastify();
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(instance)],
  });

  const port = listenPortFromUrl(env.PRODUCT_SERVICE_URL);

  const server = new FastifyHttpServer({
    server: instance,
    config: { host: "0.0.0.0", port, environment: "development", version: 1 },
    cors: { credentials: true, origin: env.ERP_WEB_URL },
    cookie: { secret: env.JWT_SECRET },
    graphql: { apollo, path: "/graphql", createContext },
    routes,
    logger,
  });

  await instance.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Product Service",
        version: "0.0.0",
        description: "Product APIs",
        license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
      },
      servers: [{ url: env.PRODUCT_SERVICE_URL }],
      tags: [{ name: "auth", description: "Authentication related end-points" }],
    },
  });

  await server.start();
  writeOpenApiToDist(instance);
};

main().catch((error) => {
  console.log(error);
});
