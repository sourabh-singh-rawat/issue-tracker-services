import { defineEvent } from "../../../cloud-events";
import { PlatformRoleAssignmentCreatedDataSchema } from "../schemas";

export const PlatformRoleAssignmentCreatedEvent = defineEvent({
  type: "platform.platform-role-assignment.created",
  version: 1,
  schema: PlatformRoleAssignmentCreatedDataSchema,
});
