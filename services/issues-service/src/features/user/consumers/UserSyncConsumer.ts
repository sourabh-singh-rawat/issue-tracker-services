import { UserAlreadyExists } from "@pine/common";
import {
  type CloudEvent,
  type IBroker,
  type UserEmailVerifiedData,
  Streams,
  Consumer,
  UserEmailVerifiedEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { Database } from "@/db";
import type { IUserRepository } from "@/features/user/repositories";

@injectable()
export class UserSyncConsumer extends Consumer<CloudEvent<UserEmailVerifiedData>> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = "issues-user-sync";
  readonly subjects = [UserEmailVerifiedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.Database)
    private readonly db: Database,
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<UserEmailVerifiedData>) {
    const event = validateEvent(UserEmailVerifiedEvent, payload);
    const { userId } = event.data!;

    await this.db.transaction(async (tx) => {
      const isAlreadyUser = await this.userRepository.existsById(userId, { tx });
      if (isAlreadyUser) throw new UserAlreadyExists();

      await this.userRepository.save({ id: userId }, { tx });
    });

    message.ack();
  }
}
