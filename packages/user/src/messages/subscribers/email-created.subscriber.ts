import {
  Consumers,
  EmailCreatedPayload,
  Messenger,
  Streams,
  Subscriber,
} from "@sourabhrawatcc/core-utils";
import { JsMsg } from "nats";

export class EmailCreatedSubscriber extends Subscriber<EmailCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.EmailCreatedConsumerUser;

  constructor(private readonly messenger: Messenger) {
    super(messenger.client);
  }

  onMessage = async (message: JsMsg, payload: EmailCreatedPayload) => {
    const { receiverEmail, id } = payload;
    message.ack();
    return console.log("Message processing completed");
  };
}
