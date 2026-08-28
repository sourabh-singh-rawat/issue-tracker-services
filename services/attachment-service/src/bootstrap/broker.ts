import { NatsBroker, Streams } from "@pine/events";
import { env } from "@/bootstrap/env";

export const broker = new NatsBroker({
  servers: [env.NATS_URL],
  streams: [Streams.ATTACHMENT, Streams.IDENTITY, Streams.PLATFORM],
});
