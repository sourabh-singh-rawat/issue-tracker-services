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
import { TYPES } from "@/bootstrap/container-types";
import type { Database } from "@/db";
import type { IUserRepository } from "@/features/user/repositories";

@injectable()
export class IdentitySyncConsumer extends Consumer<CloudEvent<IdentityEmailVerifiedData>> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = "issues-identity-sync";
  readonly subjects = [IdentityEmailVerifiedEvent.type];

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

  async onMessage(message: JsMsg, payload: CloudEvent<IdentityEmailVerifiedData>) {
    const event = validateEvent(IdentityEmailVerifiedEvent, payload);
    const { userId } = event.data!;

    await this.db.transaction(async (tx) => {
      const isAlreadyUser = await this.userRepository.existsById(userId, { tx });
      if (isAlreadyUser) throw new UserAlreadyExists();

      await this.userRepository.save({ id: userId }, { tx });
    });

    message.ack();
  }
}
