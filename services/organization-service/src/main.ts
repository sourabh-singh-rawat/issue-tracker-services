import { env } from "@/bootstrap/env";
import "reflect-metadata";

import type { IHttpServer } from "@pine/server";
import { initializeObservability } from "@pine/observability";
import { broker, container, initializeDb, TYPES } from "@/bootstrap";
import { openApiOutputPath } from "@/bootstrap/container";
import { writeSchemaToDist } from "@/bootstrap/graphql";
import { logger } from "@/bootstrap/logger";

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

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Organization service listening on http://0.0.0.0:5005");
  httpServer.writeOpenApi(openApiOutputPath);

  await broker.init();
};

main().catch((error) => {
  console.log(error);
});
