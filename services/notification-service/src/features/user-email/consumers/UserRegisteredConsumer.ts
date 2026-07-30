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
import { dataSource } from "@/bootstrap/data-source";
import { User } from "@/entities";
import { IUserEmailService } from "../services/IUserEmailService";

@injectable()
export class UserRegisteredConsumer extends Consumer<CloudEvent<UserRegisteredData>> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = "notification-user-registered";
  readonly subjects = [UserRegisteredEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.UserEmailService)
    private readonly userEmailService: IUserEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: CloudEvent<UserRegisteredData>) => {
    const event = validateEvent(UserRegisteredEvent, payload);
    const { userId, email } = event.data!;

    await dataSource.transaction(async (manager) => {
      const UserRepo = manager.getRepository(User);

      const existing = await UserRepo.findOne({ where: { id: userId } });
      if (!existing) {
        await UserRepo.save({ id: userId });
      }

      await this.userEmailService.sendEmail({ userId, email, manager });
    });

    message.ack();
  };
}
