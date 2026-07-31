import { UserAlreadyExists } from "@pine/common";
import {
  type CloudEvent,
  type IBroker,
  type IdentityEmailVerifiedData,
  Streams,
  Consumer,
  IdentityEmailVerifiedEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { DataSource } from "typeorm";
import { TYPES } from "@/bootstrap/container-types";
import { User } from "@/entities/User";

@injectable()
export class IdentitySyncConsumer extends Consumer<CloudEvent<IdentityEmailVerifiedData>> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = "attachment-identity-sync";
  readonly subjects = [IdentityEmailVerifiedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.DataSource)
    private readonly dataSource: DataSource,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<IdentityEmailVerifiedData>) {
    const event = validateEvent(IdentityEmailVerifiedEvent, payload);
    const { userId } = event.data!;

    await this.dataSource.transaction(async (manager) => {
      const UserRepo = manager.getRepository(User);

      const isAlreadyUser = await UserRepo.findOne({ where: { id: userId } });
      if (isAlreadyUser) throw new UserAlreadyExists();

      await UserRepo.save({ id: userId });
    });

    message.ack();
  }
}
