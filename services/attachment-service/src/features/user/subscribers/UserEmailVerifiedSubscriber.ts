import { UserAlreadyExists } from "@pine/common";
import {
  type IBroker,
  CONSUMERS,
  SUBJECTS,
  Streams,
  Subscriber,
  UserEmailVerifiedData,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { DataSource } from "typeorm";
import { TYPES } from "@/bootstrap/container-types";
import { User } from "@/entities/User";

@injectable()
export class UserEmailVerifiedSubscriber extends Subscriber<UserEmailVerifiedData> {
  readonly stream = Streams.USER;
  readonly consumer = CONSUMERS.USER_EMAIL_VERIFIED_ATTACHMENT;
  readonly subject = SUBJECTS.USER_EMAIL_VERIFIED;

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: UserEmailVerifiedData) {
    const { userId } = payload;

    await this.dataSource.transaction(async (manager) => {
      const UserRepo = manager.getRepository(User);

      const isAlreadyUser = await UserRepo.findOne({ where: { id: userId } });
      if (isAlreadyUser) throw new UserAlreadyExists();

      await UserRepo.save({ id: userId });
    });

    message.ack();
  }
}
