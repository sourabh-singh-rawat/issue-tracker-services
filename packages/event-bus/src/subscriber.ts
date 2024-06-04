import { JSONCodec, JsMsg, NatsConnection } from "nats";
import { Streams, Consumers } from "./enums";

/**
 * Subscriber that consumers a particular consumer.
 */
export abstract class Subscriber<T> {
  private readonly jetstreamClient;
  abstract readonly stream: Streams;
  abstract readonly consumer: Consumers;

  constructor(client?: NatsConnection) {
    if (!client) throw Error("client must be specified");

    this.jetstreamClient = client.jetstream();
  }

  fetchMessages = async () => {
    const consumer = await this.jetstreamClient.consumers.get(
      this.stream,
      this.consumer,
    );
    const messages = await consumer.consume({ max_messages: 5 });

    for await (const message of messages) {
      console.log("Message received");
      const codec = JSONCodec<T>();
      await this.onMessage(message, codec.decode(message.data));
    }
  };

  // processing for individual message
  abstract onMessage(messagae: JsMsg, payload: T): Promise<void>;
}
