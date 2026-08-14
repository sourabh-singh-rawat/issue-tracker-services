import { defineEvent } from "../../../cloud-events";
import { TenantRolePermissionsUpdatedDataSchema } from "../schemas";

export const TenantRolePermissionsUpdatedEvent = defineEvent({
  type: "platform.tenant-role.permissions-updated",
  version: 1,
  schema: TenantRolePermissionsUpdatedDataSchema,
});
