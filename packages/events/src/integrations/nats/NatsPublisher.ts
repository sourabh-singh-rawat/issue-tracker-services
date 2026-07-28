import { JSONCodec } from "nats";
import type { CloudEvent } from "../../cloud-events";
import type { IPublisher } from "./IPublisher";
import type { NatsBroker } from "./NatsBroker";

export class NatsPublisher implements IPublisher {
  constructor(private readonly broker: NatsBroker) {}

  async send(event: CloudEvent): Promise<void> {
    if (!event.type) {
      throw new Error("CloudEvent type is required for publishing");
    }

    const codec = JSONCodec<CloudEvent>();
    const encodedMessage = codec.encode(event);

    const client = this.broker.client;
    if (!client) {
      throw new Error("NATS broker is not connected");
    }

    const jetstream = client.jetstream();
    await jetstream.publish(event.type, encodedMessage);
  }
}
