import { JsMsg } from "nats";
import { EmailService } from "../../services/interfaces/email.service";
import {
  CONSUMERS,
  EventBus,
  Streams,
  SUBJECTS,
  Subscriber,
  UserRegisteredPayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { UserService } from "../../services/interfaces/user.service";

export class UserCreatedSubscriber extends Subscriber<UserRegisteredPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_REGISTERED_MAIL;
  readonly subject = SUBJECTS.USER_REGISTERED;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
    private readonly orm: Typeorm,
    private readonly emailService: EmailService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: UserRegisteredPayload) => {
    await this.userService.createUserAndEmailConfirmation(payload);
    message.ack();
  };
}
