import { JSONCodec } from "nats";
import { Subjects } from "./enums";
import { MessagePayload, Publisher } from "./interfaces";
import { NatsBroker } from "./nats.broker";

export class NatsPublisher implements Publisher<Subjects> {
  constructor(private readonly broker: NatsBroker) {}

  async send<T extends MessagePayload>(subject: Subjects, message: T) {
    const codec = JSONCodec<T>();
    const encodedMessage = codec.encode(message);

    const client = this.broker.client;
    if (!client) throw new Error("Nats Broker Error");

    const jetstream = client.jetstream();
    await jetstream.publish(subject, encodedMessage);
  }
}
