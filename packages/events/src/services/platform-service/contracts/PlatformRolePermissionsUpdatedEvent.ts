import { defineEvent } from "../../../cloud-events";
import { PlatformRolePermissionsUpdatedDataSchema } from "../schemas";

export const PlatformRolePermissionsUpdatedEvent = defineEvent({
  type: "platform.platform-role.permissions-updated",
  version: 1,
  schema: PlatformRolePermissionsUpdatedDataSchema,
});
