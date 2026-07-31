import {
  type CloudEvent,
  type IBroker,
  type UserRegisteredData,
  Streams,
  Consumer,
  UserRegisteredEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { Database } from "@/db";
import type { IUserEmailService } from "../services/IUserEmailService";

@injectable()
export class UserRegisteredConsumer extends Consumer<CloudEvent<UserRegisteredData>> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = "notification-user-registered";
  readonly subjects = [UserRegisteredEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.Database)
    private readonly db: Database,
    @inject(TYPES.UserEmailService)
    private readonly userEmailService: IUserEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: CloudEvent<UserRegisteredData>) => {
    const event = validateEvent(UserRegisteredEvent, payload);
    const { userId, email } = event.data!;

    await this.db.transaction(async (tx) => {
      await this.userEmailService.sendEmail({ userId, email, tx });
    });

    message.ack();
  };
}
