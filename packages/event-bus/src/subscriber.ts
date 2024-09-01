import {
  AckPolicy,
  DeliverPolicy,
  JSONCodec,
  JsMsg,
  NatsConnection,
  ReplayPolicy,
} from "nats";
import { Streams, Consumers } from "./enums";

export abstract class Subscriber<T> {
  private readonly jetstream;
  abstract readonly stream: Streams;
  abstract readonly consumer: Consumers;
  abstract readonly subject: string;

  constructor(client?: NatsConnection) {
    if (!client) throw Error("client must be specified");

    this.jetstream = client.jetstream();
  }

  fetchMessages = async () => {
    const jetstreamManager = await this.jetstream.jetstreamManager();
    await jetstreamManager.consumers.add(this.stream, {
      name: this.consumer,
      durable_name: this.consumer,
      deliver_policy: DeliverPolicy.All,
      filter_subject: this.subject,
      max_deliver: 100,
      ack_wait: 30 * 1000 * 1000 * 1000,
      ack_policy: AckPolicy.Explicit,
      replay_policy: ReplayPolicy.Instant,
    });

    const consumer = await this.jetstream.consumers.get(
      this.stream,
      this.consumer,
    );
    const messages = await consumer.consume({ max_messages: 5 });

    for await (const message of messages) {
      const codec = JSONCodec<T>();
      await this.onMessage(message, codec.decode(message.data));
    }
  };

  // processing for individual message
  abstract onMessage(messagae: JsMsg, payload: T): Promise<void>;
}
