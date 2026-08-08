import { env } from "@/bootstrap/env";
import "reflect-metadata";

import type { IHttpServer } from "@pine/http";
import { initializeObservability } from "@pine/observability";
import { broker, container, initializeDb, TYPES } from "@/bootstrap";
import { fastifyServer } from "@/bootstrap/fastify";
import { createGraphQL, writeSchemaToDist } from "@/bootstrap/graphql";
import { logger } from "@/bootstrap/logger";
import { registerSwagger, writeOpenApi } from "@/bootstrap/swagger";

export { container, db } from "@/bootstrap";
export { builder, createContext } from "@/graphql";
export type { AuthContext } from "@/graphql";
export { schema } from "@/graphql/schema";

const main = async () => {
  const observability = initializeObservability({
    enabled: true,
    serviceName: "organization-service",
    serviceVersion: "0.0.0",
    environment: env.NODE_ENV,
    serviceNamespace: "pine",
    otlpEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  });
  observability?.start();

  await initializeDb();

  writeSchemaToDist();

  await registerSwagger(fastifyServer);
  fastifyServer.route(await createGraphQL(fastifyServer));

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Organization service listening on http://0.0.0.0:5005");
  writeOpenApi(fastifyServer);

  await broker.init();
};

main().catch((error) => {
  console.log(error);
});
