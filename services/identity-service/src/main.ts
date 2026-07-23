import { env } from "@/env";
import "reflect-metadata";

import { ApolloServer, BaseContext } from "@apollo/server";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import swagger from "@fastify/swagger";
import { initializeObservability } from "@pine/observability";
import { CoreHttpServer } from "@pine/server-core";
import fastify, { type FastifyInstance } from "fastify";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { lexicographicSortSchema, printSchema } from "graphql";
import { broker, dataSource, logger } from "@/bootstrap";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";
import { routes } from "@/routes";
export { builder, createContext } from "@/graphql";
export type { AuthContext } from "@/graphql";
export { schema } from "@/graphql/schema";
export { container, dataSource } from "@/bootstrap";

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
    serviceName: "identity-service",
    serviceVersion: "0.0.0",
    environment: env.NODE_ENV,
    serviceNamespace: "pine",
    otlpEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  });
  observability?.start();

  await dataSource.initialize();
  await broker.init();

  writeSchemaToDist();

  const instance = fastify();
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(instance)],
  });

  const port = Number.parseInt(env.IDENTITY_SERVICE_PORT, 10);

  const server = new CoreHttpServer({
    server: instance,
    config: { host: "0.0.0.0", port, environment: "development", version: 1 },
    cors: { credentials: true, origin: process.env.ISSUE_TRACKER_CLIENT_URL },
    cookie: { secret: process.env.JWT_SECRET! },
    graphql: { apollo, path: "/graphql", createContext },
    routes,
    logger,
  });

  await instance.register(swagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Identity Service",
        version: "0.0.0",
        description: "Authentication and identity APIs",
        license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
      },
      servers: [{ url: `http://localhost:${port}` }],
      tags: [{ name: "auth", description: "Authentication related end-points" }],
    },
  });

  await server.start();
  writeOpenApiToDist(instance);
};

main().catch((error) => {
  console.log(error);
});
