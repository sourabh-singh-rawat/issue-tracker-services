import { env } from "@/bootstrap/env";
import "reflect-metadata";

import type { IHttpServer } from "@pine/http";
import { initializeObservability } from "@pine/observability";
import { broker, container, initializeDb, TYPES } from "@/bootstrap";
import { fastifyServer } from "@/bootstrap/fastify";
import { logger } from "@/bootstrap/logger";
import { registerSwagger, writeOpenApi } from "@/bootstrap/swagger";
import { BrandSyncConsumer } from "@/features/brands";
import { IdentitySyncConsumer } from "@/features/identities";
import { ProductSyncConsumer } from "@/features/products";

export { container, db } from "@/bootstrap";

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

  await registerSwagger(fastifyServer);

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Inventory service listening on http://0.0.0.0:5002");
  writeOpenApi(fastifyServer);

  await broker.init();

  void container.get<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).start();
  void container.get<BrandSyncConsumer>(TYPES.BrandSyncConsumer).start();
  void container.get<ProductSyncConsumer>(TYPES.ProductSyncConsumer).start();
};

main().catch((error) => {
  console.log(error);
});
