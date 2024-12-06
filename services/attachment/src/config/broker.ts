import { NatsBroker } from "@issue-tracker/event-bus";

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
});
