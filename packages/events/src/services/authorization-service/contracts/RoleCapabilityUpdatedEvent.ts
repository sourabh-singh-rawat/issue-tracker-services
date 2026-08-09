import { defineEvent } from "../../../cloud-events";
import { RoleCapabilityUpdatedDataSchema } from "../schemas";

export const RoleCapabilityUpdatedEvent = defineEvent({
  type: "authorization.role-capability.updated",
  version: 1,
  schema: RoleCapabilityUpdatedDataSchema,
});
