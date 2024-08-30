import { JsMsg } from "nats";
import {
  CONSUMERS,
  EventBus,
  Streams,
  SUBJECTS,
  Subscriber,
  UserRegisteredPayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { UserEmailService } from "../../services/interfaces/user-email.service";

export class UserRegisteredSubscriber extends Subscriber<UserRegisteredPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_REGISTERED_MAIL;
  readonly subject = SUBJECTS.USER_REGISTERED;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userEmailService: UserEmailService,
    private readonly orm: Typeorm,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: UserRegisteredPayload) => {
    await this.userEmailService.createUserAndSendRegistrationEmail(payload);

    message.ack();
  };
}
