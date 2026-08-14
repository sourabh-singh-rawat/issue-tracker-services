import { IDENTITY, ROLE, ROLE_MEMBER } from "@pine/authorization";
import {
  type CloudEvent,
  type IBroker,
  type TenantMemberCreatedData,
  type TenantMemberDeletedData,
  Consumer,
  TenantMemberCreatedEvent,
  TenantMemberDeletedEvent,
  Streams,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class TenantMemberSyncConsumer extends Consumer<
  CloudEvent<TenantMemberCreatedData | TenantMemberDeletedData>
> {
  readonly stream = Streams.PLATFORM;
  readonly consumer = "authorization-tenant-member-sync";
  readonly subjects = [TenantMemberCreatedEvent.type, TenantMemberDeletedEvent.type];

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
    payload: CloudEvent<TenantMemberCreatedData | TenantMemberDeletedData>,
  ): Promise<void> {
    if (payload.type === TenantMemberCreatedEvent.type) {
      const event = validateEvent(TenantMemberCreatedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }

      const relationship = {
        object: { type: ROLE.name, id: data.tenantRoleId },
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

    if (payload.type === TenantMemberDeletedEvent.type) {
      const event = validateEvent(TenantMemberDeletedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }

      const relationship = {
        object: { type: ROLE.name, id: data.tenantRoleId },
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
