import { CAPABILITY, CAPABILITY_HAS, ROLE, ROLE_ASSIGNEE } from "@pine/authorization";
import {
  type CloudEvent,
  type IBroker,
  type PlatformRoleCapabilitiesUpdatedData,
  type TenantRoleCapabilitiesUpdatedData,
  Consumer,
  PlatformRoleCapabilitiesUpdatedEvent,
  TenantRoleCapabilitiesUpdatedEvent,
  Streams,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class PlatformRoleCapabilitySyncConsumer extends Consumer<
  CloudEvent<PlatformRoleCapabilitiesUpdatedData | TenantRoleCapabilitiesUpdatedData>
> {
  readonly stream = Streams.PLATFORM;
  readonly consumer = "authorization-platform-role-capability-sync";
  readonly subjects = [
    PlatformRoleCapabilitiesUpdatedEvent.type,
    TenantRoleCapabilitiesUpdatedEvent.type,
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
    payload: CloudEvent<PlatformRoleCapabilitiesUpdatedData | TenantRoleCapabilitiesUpdatedData>,
  ): Promise<void> {
    const event =
      payload.type === TenantRoleCapabilitiesUpdatedEvent.type
        ? validateEvent(TenantRoleCapabilitiesUpdatedEvent, payload)
        : validateEvent(PlatformRoleCapabilitiesUpdatedEvent, payload);
    const data = event.data;
    if (!data) {
      message.ack();
      return;
    }

    const { roleId, capabilityKeys } = data;

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
