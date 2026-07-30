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
import type { IIdentityRepository } from "@/features/identities/repositories";

@injectable()
export class UserSyncConsumer extends Consumer<CloudEvent<UserEmailVerifiedData>> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = "product-user-sync";
  readonly subjects = [UserEmailVerifiedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.Database)
    private readonly db: Database,
    @inject(TYPES.IdentityRepository)
    private readonly identityRepository: IIdentityRepository,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<UserEmailVerifiedData>) {
    const event = validateEvent(UserEmailVerifiedEvent, payload);
    const { userId, email } = event.data!;

    await this.db.transaction(async (tx) => {
      const exists = await this.identityRepository.existsById(userId);
      if (exists) {
        return;
      }

      await this.identityRepository.save({ id: userId, email }, { tx });
    });

    message.ack();
  }
}
