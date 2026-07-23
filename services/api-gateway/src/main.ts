import { initializeObservability } from "@pine/observability";
import { createHttpServer } from "./bootstrap";
import { env } from "./env";

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

  console.log(`🚀 API Gateway ready at http://127.0.0.1:${env.API_GATEWAY_PORT}`);
  console.log(`   GraphQL:  http://127.0.0.1:${env.API_GATEWAY_PORT}/graphql`);
  console.log(`   Proxy → identity:   ${env.IDENTITY_SERVICE_URL}  (/identity)`);
  console.log(`   Proxy → attachment: ${env.ATTACHMENT_SERVICE_URL}  (/attachments)`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
