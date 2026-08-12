import { env } from "@/bootstrap/env";
import "reflect-metadata";

import type { IHttpServer } from "@pine/server";
import { initializeObservability } from "@pine/observability";
import { broker, container, TYPES } from "@/bootstrap";
import { openApiOutputPath } from "@/bootstrap/container";
import { logger } from "@/bootstrap/logger";
import {
  PlatformRoleAssignmentSyncConsumer,
  PlatformRoleCapabilitySyncConsumer,
} from "@/features/platform";

export { container } from "@/bootstrap";

const main = async () => {
  const observability = initializeObservability({
    enabled: true,
    serviceName: "authorization-service",
    serviceVersion: "0.0.0",
    environment: env.NODE_ENV,
    serviceNamespace: "pine",
    otlpEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  });
  observability?.start();

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Authorization service listening on http://0.0.0.0:5006");
  httpServer.writeOpenApi(openApiOutputPath);

  await broker.init();

  void container
    .get<PlatformRoleCapabilitySyncConsumer>(TYPES.PlatformRoleCapabilitySyncConsumer)
    .start();
  void container
    .get<PlatformRoleAssignmentSyncConsumer>(TYPES.PlatformRoleAssignmentSyncConsumer)
    .start();
};

main().catch((error) => {
  console.log(error);
});
