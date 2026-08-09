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

const ROLE_NAMESPACE = "role";
const CAPABILITY_MEMBER_RELATION = "member";

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
      const [namespace, object, relation] = capabilityKey.split(":");
      if (!namespace || !object || !relation) {
        continue;
      }

      const relationship = {
        object: { type: namespace, id: `${object}:${relation}` },
        relation: CAPABILITY_MEMBER_RELATION,
        subject: { type: ROLE_NAMESPACE, id: roleId },
      };


      const existing = await this.authorizationGraphProvider.listRelationships({
        object: relationship.object,
        relation: relationship.relation,
        subject: relationship.subject,
      });

      if (existing.length === 0) {
        await this.authorizationGraphProvider.createRelationship(relationship);
      }
    }

    message.ack();
  }
}
