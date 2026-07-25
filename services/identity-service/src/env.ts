import { config } from "dotenv";
import path from "node:path";

config({ path: path.resolve(__dirname, "../../../.env") });

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  IDENTITY_SERVICE_PORT: process.env.IDENTITY_SERVICE_PORT ?? "4001",
  IDENTITY_POSTGRES_CLUSTER_URL: process.env.IDENTITY_POSTGRES_CLUSTER_URL,
  NATS_CLUSTER_URL: process.env.NATS_CLUSTER_URL ?? "nats://localhost:4222",
  JWT_SECRET: process.env.JWT_SECRET,
  IDENTITY_WEB_CLIENT_URL: process.env.IDENTITY_WEB_CLIENT_URL ?? "http://localhost:3001",
  KRATOS_PUBLIC_URL: process.env.KRATOS_PUBLIC_URL ?? "http://127.0.0.1:4433",
  KRATOS_ADMIN_URL: process.env.KRATOS_ADMIN_URL ?? "http://127.0.0.1:4434",
  HYDRA_PUBLIC_URL: process.env.HYDRA_PUBLIC_URL ?? "http://127.0.0.1:4444",
  HYDRA_ADMIN_URL: process.env.HYDRA_ADMIN_URL ?? "http://127.0.0.1:4445",
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env.OTEL_EXPORTER_OTLP_ENDPOINT ?? "http://127.0.0.1:4317",
} as const;
