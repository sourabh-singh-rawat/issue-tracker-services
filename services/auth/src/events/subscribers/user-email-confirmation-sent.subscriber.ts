import {
  CONSUMERS,
  EventBus,
  Streams,
  Subjects,
  Subscriber,
  UserEmailConfirmationSentPayload,
} from "@issue-tracker/event-bus";
import { JsMsg } from "nats";
import { UserService } from "../../services/interfaces/user.service";
import { USER_EMAIL_CONFIRMATION_STATUS } from "@issue-tracker/common";

export class UserEmailConfirmationSentSubscriber extends Subscriber<UserEmailConfirmationSentPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_EMAIL_CONFIRMATION_SENT_AUTH;
  readonly subject = Subjects.USER_CONFIRMATION_EMAIL_SENT;

  constructor(
    private readonly eventBus: EventBus,
    private readonly userService: UserService,
  ) {
    super(eventBus.client);
  }

  onMessage = async (
    message: JsMsg,
    payload: UserEmailConfirmationSentPayload,
  ) => {
    const { userId } = payload;

    await this.userService.update(userId, {
      emailConfirmationStatus: USER_EMAIL_CONFIRMATION_STATUS.SENT,
    });
    message.ack();
  };
}
