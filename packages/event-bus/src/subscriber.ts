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
  private readonly jetstreamClient;
  abstract readonly stream: Streams;
  abstract readonly consumer: Consumers;
  abstract readonly subject: string;

  constructor(client?: NatsConnection) {
    if (!client) throw Error("client must be specified");

    this.jetstreamClient = client.jetstream();
  }

  fetchMessages = async () => {
    const jsm = await this.jetstreamClient.jetstreamManager();
    const found = await jsm.consumers.info(this.stream, this.consumer);

    if (!found) {
      await jsm.consumers.add(this.stream, {
        name: this.consumer,
        durable_name: this.consumer,
        deliver_policy: DeliverPolicy.All,
        filter_subject: this.subject,
        max_deliver: 100,
        ack_wait: 30 * 1000 * 1000 * 1000,
        ack_policy: AckPolicy.Explicit,
        replay_policy: ReplayPolicy.Instant,
      });
    }
    const consumer = await this.jetstreamClient.consumers.get(
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
