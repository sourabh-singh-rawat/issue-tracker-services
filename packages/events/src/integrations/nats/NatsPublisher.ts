import { JSONCodec } from "nats";
import type { IPublisher, MessagePayload } from "./IPublisher";
import type { NatsBroker } from "./NatsBroker";

/**
 * NATS JetStream implementation of {@link IPublisher}.
 */
export class NatsPublisher implements IPublisher {
  constructor(private readonly broker: NatsBroker) {}

  async send(subject: string, message: MessagePayload): Promise<void> {
    const codec = JSONCodec<MessagePayload>();
    const encodedMessage = codec.encode(message);

    const client = this.broker.client;
    if (!client) {
      throw new Error("NATS broker is not connected");
    }

    const jetstream = client.jetstream();
    await jetstream.publish(subject, encodedMessage);
  }
}
