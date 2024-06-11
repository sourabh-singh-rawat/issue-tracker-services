import {
  Consumers,
  EmailCreatedPayload,
  EventBus,
  Streams,
  Subscriber,
} from "@issue-tracker/event-bus";
import { JsMsg } from "nats";

export class EmailCreatedSubscriber extends Subscriber<EmailCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.EmailCreatedConsumerUser;

  constructor(private readonly eventBus: EventBus) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg) => {
    message.ack();
    return console.log("Message processing completed");
  };
}
