import { Message } from "@issue-tracker/common";
import { NatsConnection, JSONCodec } from "nats";

/**
 * Publisher to publish messages to nats jetstream.
 */
export abstract class Publisher<T extends Message> {
  abstract subject: T["subject"];
  private readonly jetstreamClient;

  constructor(client?: NatsConnection) {
    if (!client) throw Error("client must be specified");

    this.jetstreamClient = client.jetstream();
  }

  publish = async (message: T["payload"]) => {
    const codec = JSONCodec<T["payload"]>();
    await this.jetstreamClient.publish(this.subject, codec.encode(message));
  };
}
