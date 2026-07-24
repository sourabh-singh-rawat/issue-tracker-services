import { NatsBroker } from "@pine/events";

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
});
