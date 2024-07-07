import { JsMsg } from "nats";
import { EmailService } from "../../services/interfaces/email.service";
import {
  CONSUMERS,
  EventBus,
  Streams,
  Subjects,
  Subscriber,
  UserCreatedPayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { UserService } from "../../services/interfaces/user.service";

export class UserCreatedSubscriber extends Subscriber<UserCreatedPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_CREATED_MAIL;
  readonly subject = Subjects.USER_CREATED;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
    private readonly orm: Typeorm,
    private readonly emailService: EmailService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (message: JsMsg, payload: UserCreatedPayload) => {
    await this.userService.createUserAndEmailConfirmation(payload);
    message.ack();
  };
}
