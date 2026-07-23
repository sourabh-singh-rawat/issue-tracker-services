import { resourceFromAttributes } from "@opentelemetry/resources";
import type { NodeSDK } from "@opentelemetry/sdk-node";
import { createNodeSdk } from "./bootstrap/node-sdk";

export interface ObservabilityOptions {
  enabled: boolean;
  serviceName: string;
  serviceVersion: string;
  environment: string;
  serviceNamespace: string;
  otlpEndpoint: string;
}

export const initializeObservability = (options: ObservabilityOptions): NodeSDK | null => {
  if (!options.enabled) {
    return null;
  }

  const sdk = createNodeSdk({
    serviceName: options.serviceName,
    otlpEndpoint: options.otlpEndpoint,
    resource: resourceFromAttributes({
      "service.name": options.serviceName,
      "service.version": options.serviceVersion,
      "service.namespace": options.serviceNamespace,
      "deployment.environment": options.environment,
    }),
  });

  process.on("SIGTERM", async () => {
    try {
      await sdk.shutdown();
    } catch (error) {
      console.error("Error shutting down OpenTelemetry SDK", error);
    } finally {
      process.exit(0);
    }
  });

  return sdk;
};
