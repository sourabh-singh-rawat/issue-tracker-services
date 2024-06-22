import {
  Consumers,
  EmailCreatedPayload,
  EventBus,
  Streams,
  Subjects,
  Subscriber,
} from "@issue-tracker/event-bus";
import { JsMsg } from "nats";

export class EmailCreatedSubscriber extends Subscriber<EmailCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = Consumers.EmailCreatedConsumerUser;
  readonly subject = Subjects.EMAIL_CREATED;

  constructor(private readonly eventBus: EventBus) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg) => {
    message.ack();
  };
}
