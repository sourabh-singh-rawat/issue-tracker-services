import { CAPABILITY, CAPABILITY_HAS, ROLE, ROLE_ASSIGNEE } from "@pine/authorization";
import {
  type CloudEvent,
  type IBroker,
  type RoleCapabilityUpdatedData,
  Consumer,
  RoleCapabilityUpdatedEvent,
  Streams,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class RoleCapabilityKetoSyncConsumer extends Consumer<
  CloudEvent<RoleCapabilityUpdatedData>
> {
  readonly stream = Streams.AUTHORIZATION;
  readonly consumer = "authorization-role-capability-keto-sync";
  readonly subjects = [RoleCapabilityUpdatedEvent.type];

  constructor(
    @inject(TYPES.Broker)
    private readonly broker: IBroker,
    @inject(TYPES.AuthorizationGraphProvider)
    private readonly authorizationGraphProvider: IAuthorizationGraphProvider,
  ) {
    super(broker.client);
  }

  async onMessage(message: JsMsg, payload: CloudEvent<RoleCapabilityUpdatedData>) {
    const event = validateEvent(RoleCapabilityUpdatedEvent, payload);
    const { roleId, capabilityKeys } = event.data!;

    for (const capabilityKey of capabilityKeys) {
      const segments = capabilityKey.split(":");
      if (segments.length !== 3 || segments.some((segment) => segment.length === 0)) {
        continue;
      }

      const relationship = {
        object: { type: CAPABILITY.name, id: capabilityKey },
        relation: CAPABILITY_HAS,
        subjectSet: {
          type: ROLE.name,
          id: roleId,
          relation: ROLE_ASSIGNEE,
        },
      };

      const existing = await this.authorizationGraphProvider.listRelationships({
        object: relationship.object,
        relation: relationship.relation,
        subjectSet: relationship.subjectSet,
      });

      if (existing.length === 0) {
        await this.authorizationGraphProvider.createRelationship(relationship);
      }
    }

    message.ack();
  }
}
