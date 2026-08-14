import { IDENTITY, ROLE, ROLE_MEMBER } from "@pine/authorization";
import {
  type CloudEvent,
  type IBroker,
  type PlatformMemberCreatedData,
  type PlatformMemberDeletedData,
  Consumer,
  PlatformMemberCreatedEvent,
  PlatformMemberDeletedEvent,
  Streams,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class PlatformMemberSyncConsumer extends Consumer<
  CloudEvent<PlatformMemberCreatedData | PlatformMemberDeletedData>
> {
  readonly stream = Streams.PLATFORM;
  readonly consumer = "authorization-platform-member-sync";
  readonly subjects = [PlatformMemberCreatedEvent.type, PlatformMemberDeletedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.AuthorizationGraphProvider)
    private readonly authorizationGraphProvider: IAuthorizationGraphProvider,
  ) {
    super(broker.client);
  }

  async onMessage(
    message: JsMsg,
    payload: CloudEvent<PlatformMemberCreatedData | PlatformMemberDeletedData>,
  ): Promise<void> {
    if (payload.type === PlatformMemberCreatedEvent.type) {
      const event = validateEvent(PlatformMemberCreatedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }

      const relationship = {
        object: { type: ROLE.name, id: data.platformRoleId },
        relation: ROLE_MEMBER,
        subject: { type: IDENTITY.name, id: data.identityId },
      };

      const existing = await this.authorizationGraphProvider.listRelationships({
        object: relationship.object,
        relation: relationship.relation,
        subject: relationship.subject,
      });

      if (existing.length === 0) {
        await this.authorizationGraphProvider.createRelationship(relationship);
      }

      message.ack();
      return;
    }

    if (payload.type === PlatformMemberDeletedEvent.type) {
      const event = validateEvent(PlatformMemberDeletedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }

      const relationship = {
        object: { type: ROLE.name, id: data.platformRoleId },
        relation: ROLE_MEMBER,
        subject: { type: IDENTITY.name, id: data.identityId },
      };

      const existing = await this.authorizationGraphProvider.listRelationships({
        object: relationship.object,
        relation: relationship.relation,
        subject: relationship.subject,
      });

      if (existing.length > 0) {
        await this.authorizationGraphProvider.deleteRelationship(relationship);
      }

      message.ack();
      return;
    }

    message.ack();
  }
}
