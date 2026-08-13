import { defineEvent } from "../../../cloud-events";
import { TenantRoleCapabilitiesUpdatedDataSchema } from "../schemas";

export const TenantRoleCapabilitiesUpdatedEvent = defineEvent({
  type: "platform.tenant-role.capabilities-updated",
  version: 1,
  schema: TenantRoleCapabilitiesUpdatedDataSchema,
});
