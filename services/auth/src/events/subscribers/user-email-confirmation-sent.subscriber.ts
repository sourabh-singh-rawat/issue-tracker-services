import {
  Broker,
  CONSUMERS,
  Streams,
  SUBJECTS,
  Subscriber,
  UserEmailConfirmationSentPayload,
} from "@issue-tracker/event-bus";
import { EMAIL_VERIFICATION_STATUS } from "@issue-tracker/common";
import { JsMsg } from "nats";
import { UserService } from "../../Services/Interfaces/user.service";
import { VerificationLink } from "../../data/entities/VerificationLink";

export class UserEmailConfirmationSentSubscriber extends Subscriber<UserEmailConfirmationSentPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_EMAIL_CONFIRMATION_SENT_AUTH;
  readonly subject = SUBJECTS.USER_CONFIRMATION_EMAIL_SENT;

  constructor(
    private readonly broker: Broker,
    private readonly userService: UserService,
  ) {
    super(broker.client);
  }

  onMessage = async (
    message: JsMsg,
    payload: UserEmailConfirmationSentPayload,
  ) => {
    const { userId, sentAt } = payload;

    // if (!sentAt) {
    //   await this.userService.update(userId, {
    //     emailConfirmationStatus: EMAIL_VERIFICATION_STATUS.FAILED,
    //   });
    // } else {
    //   await EmailVerificationTokenEntity.update(
    //     { sentAt: new Date(sentAt * 1000) },
    //     { userId },
    //   );
    // }
    message.ack();
  };
}
