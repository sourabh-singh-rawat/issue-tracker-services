import { config } from "dotenv";
import path from "node:path";

// Load monorepo root .env before any module reads process.env.
// Path is relative to this file so it works regardless of process.cwd().
config({ path: path.resolve(__dirname, "../../../.env") });

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  ISSUE_TRACKER_SERVICE_PORT: process.env.ISSUE_TRACKER_SERVICE_PORT ?? "4002",
  ISSUE_TRACKER_POSTGRES_CLUSTER_URL: process.env.ISSUE_TRACKER_POSTGRES_CLUSTER_URL,
  NATS_CLUSTER_URL: process.env.NATS_CLUSTER_URL ?? "nats://localhost:4222",
  JWT_SECRET: process.env.JWT_SECRET,
  ISSUES_WEB_CLIENT_URL: process.env.ISSUES_WEB_CLIENT_URL ?? "http://localhost:3000",
} as const;
