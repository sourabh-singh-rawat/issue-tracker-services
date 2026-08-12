import { defineEvent } from "../../../cloud-events";
import { PlatformRoleCapabilitiesUpdatedDataSchema } from "../schemas";

export const PlatformRoleCapabilitiesUpdatedEvent = defineEvent({
  type: "platform.platform-role.capabilities-updated",
  version: 1,
  schema: PlatformRoleCapabilitiesUpdatedDataSchema,
});
