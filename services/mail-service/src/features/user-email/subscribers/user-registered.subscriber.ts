import {
  Broker,
  CONSUMERS,
  Streams,
  SUBJECTS,
  Subscriber,
  UserRegisteredPayload,
} from "@pine/event-bus";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import { dataSource } from "@/bootstrap/data-source";
import { IUserEmailService } from "../services/IUserEmailService";

@injectable()
export class UserRegisteredSubscriber extends Subscriber<UserRegisteredPayload> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_REGISTERED_MAIL;
  readonly subject = SUBJECTS.USER_REGISTERED;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: Broker,
    @inject(TYPES.UserEmailService)
    private readonly userEmailService: IUserEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: UserRegisteredPayload) => {
    await dataSource.transaction(async (manager) => {
      const { userId, email, html } = payload;
      await this.userEmailService.sendEmail({ userId, email, html, manager });
    });

    message.ack();
  };
}
