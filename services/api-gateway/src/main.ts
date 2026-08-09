import { initializeObservability } from "@pine/observability";
import { createHttpServer } from "./bootstrap";
import { env } from "./bootstrap/env";

const main = async () => {
  const observability = initializeObservability({
    enabled: true,
    serviceName: "api-gateway",
    serviceVersion: "0.0.0",
    environment: env.NODE_ENV,
    serviceNamespace: "pine",
    otlpEndpoint: env.OTEL_EXPORTER_OTLP_ENDPOINT,
  });
  observability?.start();

  const httpServer = await createHttpServer();
  await httpServer.start();

  console.log(`🚀 API Gateway ready at ${env.API_GATEWAY_URL}`);
  console.log(`   GraphQL:  ${env.API_GATEWAY_URL}/graphql`);
  console.log(`   Swagger:  ${env.API_GATEWAY_URL}/docs`);
  console.log(`   Proxy → identity:   ${env.IDENTITY_SERVICE_URL}  (/identity)`);
  console.log(`   Proxy → attachment: ${env.ATTACHMENT_SERVICE_URL}  (/attachments)`);
  console.log(`   Proxy → inventory:  ${env.INVENTORY_SERVICE_URL}  (/inventory)`);
  console.log(`   Proxy → product:    ${env.PRODUCT_SERVICE_URL}  (/products)`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
