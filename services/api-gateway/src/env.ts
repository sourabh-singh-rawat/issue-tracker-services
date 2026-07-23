import { config } from "dotenv";
import path from "node:path";

config({ path: path.resolve(__dirname, "../../../.env") });

const identityServicePort = process.env.IDENTITY_SERVICE_PORT ?? "4001";
const attachmentServicePort = process.env.ATTACHMENT_SERVICE_PORT ?? "4003";

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  API_GATEWAY_PORT: process.env.API_GATEWAY_PORT ?? "4000",
  ISSUE_TRACKER_CLIENT_URL: process.env.ISSUE_TRACKER_CLIENT_URL ?? "http://localhost:3000",
  IDENTITY_CLIENT_URL: process.env.IDENTITY_CLIENT_URL ?? "http://localhost:3001",
  /** Upstream REST/GraphQL base URL for identity-service (default local port 4001). */
  IDENTITY_SERVICE_URL:
    process.env.IDENTITY_SERVICE_URL ?? `http://127.0.0.1:${identityServicePort}`,
  /** Upstream REST/GraphQL base URL for attachment-service (default local port 4003). */
  ATTACHMENT_SERVICE_URL:
    process.env.ATTACHMENT_SERVICE_URL ?? `http://127.0.0.1:${attachmentServicePort}`,
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://127.0.0.1:4317",
} as const;
