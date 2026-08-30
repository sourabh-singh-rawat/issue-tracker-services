import {
  type CloudEvent,
  type IBroker,
  type IdentityEmailVerifiedData,
  type UserRegisteredData,
  Streams,
  Consumer,
  IdentityEmailVerifiedEvent,
  UserRegisteredEvent,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { Database } from "@/db";
import type { IIdentityRepository } from "@/features/identities/repositories";

@injectable()
export class PlatformIdentitySyncConsumer extends Consumer<
  CloudEvent<UserRegisteredData | IdentityEmailVerifiedData>
> {
  readonly stream = Streams.IDENTITY;
  readonly consumer = "platform-identity-sync";
  readonly subjects = [UserRegisteredEvent.type, IdentityEmailVerifiedEvent.type];

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

  onMessage = async (
    message: JsMsg,
    payload: CloudEvent<UserRegisteredData | IdentityEmailVerifiedData>,
  ): Promise<void> => {
    if (payload.type === UserRegisteredEvent.type) {
      const event = validateEvent(UserRegisteredEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }
      await this.upsertIdentity(data.userId);
      message.ack();
      return;
    }

    if (payload.type === IdentityEmailVerifiedEvent.type) {
      const event = validateEvent(IdentityEmailVerifiedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }
      await this.upsertIdentity(data.userId, data.displayName ?? null);
      message.ack();
    }
  };

  private upsertIdentity = async (identityId: string, displayName?: string | null): Promise<void> => {
    await this.db.transaction(async (tx) => {
      const existing = await this.identityRepository.findById(identityId, { tx });
      if (!existing) {
        await this.identityRepository.save(
          { id: identityId, displayName: displayName ?? null },
          { tx },
        );
        return;
      }

      if (displayName !== undefined && displayName !== existing.displayName) {
        await this.identityRepository.update(identityId, { displayName }, { tx });
      }
    });
  };
}
