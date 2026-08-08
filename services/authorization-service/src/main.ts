import { env } from "@/bootstrap/env";
import "reflect-metadata";

import type { IHttpServer } from "@pine/http";
import { initializeObservability } from "@pine/observability";
import type { IOutboxCleanupWorker, IOutboxWorker } from "@pine/outbox";
import { broker, container, initializeDb, TYPES } from "@/bootstrap";
import { fastifyServer } from "@/bootstrap/fastify";
import { createGraphQL, writeSchemaToDist } from "@/bootstrap/graphql";
import { logger } from "@/bootstrap/logger";
import { registerSwagger, writeOpenApi } from "@/bootstrap/swagger";
import { IdentitySyncConsumer } from "@/features/identities";
import { RoleAssignmentKetoSyncConsumer } from "@/features/roles";

export { container, db } from "@/bootstrap";
export { builder, createContext } from "@/graphql";
export type { AuthContext } from "@/graphql";
export { schema } from "@/graphql/schema";

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

  await initializeDb();

  writeSchemaToDist();

  await registerSwagger(fastifyServer);
  fastifyServer.route(await createGraphQL(fastifyServer));

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Authorization service listening on http://0.0.0.0:5006");
  writeOpenApi(fastifyServer);

  await broker.init();

  void container.get<IOutboxWorker>(TYPES.OutboxWorker).start();
  void container.get<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker).start();
  void container.get<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).start();
  void container.get<RoleAssignmentKetoSyncConsumer>(TYPES.RoleAssignmentKetoSyncConsumer).start();
};

main().catch((error) => {
  console.log(error);
});
