import { JsMsg } from "nats";
import {
  CONSUMERS,
  NatsBroker,
  Streams,
  SUBJECTS,
  Subscriber,
  UserRegisteredPayload,
} from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { UserEmailService } from "../../services/interfaces/user-email.service";
import { dataSource } from "../..";

export class UserRegisteredSubscriber extends Subscriber<UserRegisteredPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_REGISTERED_MAIL;
  readonly subject = SUBJECTS.USER_REGISTERED;

  constructor(
    private readonly broker: NatsBroker,
    private readonly userEmailService: UserEmailService,
    private readonly orm: Typeorm,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: UserRegisteredPayload) => {
    await dataSource.transaction(async (manager) => {
      const { email, html } = payload;
      await this.userEmailService.sendEmail({ email, html, manager });
    });

    message.ack();
  };
}
