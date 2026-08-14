import {
  InvalidPermissionKeyError,
  PERMISSION,
  PERMISSION_HAS,
  ROLE,
  ROLE_MEMBER,
  parsePermission,
} from "@pine/authorization";
import {
  type CloudEvent,
  type IBroker,
  type PlatformRolePermissionsUpdatedData,
  type TenantRolePermissionsUpdatedData,
  Consumer,
  PlatformRolePermissionsUpdatedEvent,
  TenantRolePermissionsUpdatedEvent,
  Streams,
  validateEvent,
} from "@pine/events";
import { inject, injectable } from "inversify";
import type { JsMsg } from "nats";
import { TYPES } from "@/bootstrap/container-types";
import type { IAuthorizationGraphProvider } from "@/integrations/authorization";

@injectable()
export class PlatformRolePermissionSyncConsumer extends Consumer<
  CloudEvent<PlatformRolePermissionsUpdatedData | TenantRolePermissionsUpdatedData>
> {
  readonly stream = Streams.PLATFORM;
  readonly consumer = "authorization-platform-role-permission-sync";
  readonly subjects = [
    PlatformRolePermissionsUpdatedEvent.type,
    TenantRolePermissionsUpdatedEvent.type,
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
    payload: CloudEvent<PlatformRolePermissionsUpdatedData | TenantRolePermissionsUpdatedData>,
  ): Promise<void> {
    const event =
      payload.type === TenantRolePermissionsUpdatedEvent.type
        ? validateEvent(TenantRolePermissionsUpdatedEvent, payload)
        : validateEvent(PlatformRolePermissionsUpdatedEvent, payload);
    const data = event.data;
    if (!data) {
      message.ack();
      return;
    }

    const { roleId, permissionKeys } = data;

    for (const permissionKey of permissionKeys) {
      try {
        parsePermission(permissionKey);
      } catch (error) {
        if (error instanceof InvalidPermissionKeyError) {
          continue;
        }
        throw error;
      }

      const relationship = {
        object: { type: PERMISSION.name, id: permissionKey },
        relation: PERMISSION_HAS,
        subjectSet: {
          type: ROLE.name,
          id: roleId,
          relation: ROLE_MEMBER,
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
