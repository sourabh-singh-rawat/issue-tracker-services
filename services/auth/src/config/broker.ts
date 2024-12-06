import { NatsBroker } from "@issue-tracker/event-bus";
import { logger } from "@issue-tracker/server-core";

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
  streams: ["user"],
  logger,
});
