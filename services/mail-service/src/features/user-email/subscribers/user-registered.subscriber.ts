import {
  type IBroker,
  CONSUMERS,
  Streams,
  SUBJECTS,
  Subscriber,
  UserRegisteredData,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import { dataSource } from "@/bootstrap/data-source";
import { User } from "@/entities";
import { IUserEmailService } from "../services/IUserEmailService";

@injectable()
export class UserRegisteredSubscriber extends Subscriber<UserRegisteredData> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_REGISTERED_MAIL;
  readonly subject = SUBJECTS.USER_REGISTERED;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.UserEmailService)
    private readonly userEmailService: IUserEmailService,
  ) {
    super(broker.client);
  }

  onMessage = async (message: JsMsg, payload: UserRegisteredData) => {
    await dataSource.transaction(async (manager) => {
      const { userId, email, html } = payload;
      const UserRepo = manager.getRepository(User);

      const existing = await UserRepo.findOne({ where: { id: userId } });
      if (!existing) {
        await UserRepo.save({ id: userId });
      }

      await this.userEmailService.sendEmail({ userId, email, html, manager });
    });

    message.ack();
  };
}
