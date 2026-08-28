import { configureTls } from "@pine/common";
import { env } from "@/bootstrap/env";
import "reflect-metadata";

configureTls({
  caPath: env.CA_CERT_PATH,
  certPath: env.INVENTORY_SERVICE_TLS_CERT_PATH,
  keyPath: env.INVENTORY_SERVICE_TLS_KEY_PATH,
});

import type { IHttpServer } from "@pine/server";
import { initializeObservability } from "@pine/observability";
import { broker, container, initializeDb, TYPES } from "@/bootstrap";
import { openApiOutputPath } from "@/bootstrap/container";
import { logger } from "@/bootstrap/logger";
import { BrandSyncConsumer } from "@/features/brands";
import { InventoryIdentitySyncConsumer } from "@/features/identities";
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

  const httpServer = container.get<IHttpServer>(TYPES.HttpServer);
  await httpServer.start();
  logger.info("Inventory service listening on http://0.0.0.0:5002");
  httpServer.writeOpenApi(openApiOutputPath);

  await broker.init();

  void container.get<InventoryIdentitySyncConsumer>(TYPES.InventoryIdentitySyncConsumer).start();
  void container.get<BrandSyncConsumer>(TYPES.BrandSyncConsumer).start();
  void container.get<ProductSyncConsumer>(TYPES.ProductSyncConsumer).start();
};

main().catch((error) => {
  console.log(error);
});
