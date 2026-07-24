import { NatsBroker } from "@pine/event-bus";
import { logger } from "@/bootstrap/logger";

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
  streams: ["email"],
  logger,
});
