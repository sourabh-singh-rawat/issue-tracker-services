import { ROLE, ROLE_ASSIGNEE, USER } from "@pine/authorization";
import {
  type CloudEvent,
  type IBroker,
  type PlatformRoleAssignmentCreatedData,
  type PlatformRoleAssignmentDeletedData,
  Consumer,
  PlatformRoleAssignmentCreatedEvent,
  PlatformRoleAssignmentDeletedEvent,
  Streams,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class PlatformRoleAssignmentSyncConsumer extends Consumer<
  CloudEvent<PlatformRoleAssignmentCreatedData | PlatformRoleAssignmentDeletedData>
> {
  readonly stream = Streams.PLATFORM;
  readonly consumer = "authorization-platform-role-assignment-sync";
  readonly subjects = [
    PlatformRoleAssignmentCreatedEvent.type,
    PlatformRoleAssignmentDeletedEvent.type,
  ];

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
    payload: CloudEvent<PlatformRoleAssignmentCreatedData | PlatformRoleAssignmentDeletedData>,
  ): Promise<void> {
    if (payload.type === PlatformRoleAssignmentCreatedEvent.type) {
      const event = validateEvent(PlatformRoleAssignmentCreatedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }

      const { platformRoleId, identityId } = data;

      const relationship = {
        object: { type: ROLE.name, id: platformRoleId },
        relation: ROLE_ASSIGNEE,
        subject: { type: USER.name, id: identityId },
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

    if (payload.type === PlatformRoleAssignmentDeletedEvent.type) {
      const event = validateEvent(PlatformRoleAssignmentDeletedEvent, payload);
      const data = event.data;
      if (!data) {
        message.ack();
        return;
      }

      const { platformRoleId, identityId } = data;

      const relationship = {
        object: { type: ROLE.name, id: platformRoleId },
        relation: ROLE_ASSIGNEE,
        subject: { type: USER.name, id: identityId },
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
