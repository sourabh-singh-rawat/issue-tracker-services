import { NatsBroker } from "@pine/events";
import { logger } from "@/bootstrap/logger";
import { env } from "@/env";

export const broker = new NatsBroker({
  servers: [env.NATS_CLUSTER_URL || "nats"],
  streams: ["issue", "workspace", "project", "user"],
  logger,
});
