import { defineEvent } from "../../../cloud-events";
import { PlatformRoleAssignmentDeletedDataSchema } from "../schemas";

export const PlatformRoleAssignmentDeletedEvent = defineEvent({
  type: "platform.platform-role-assignment.deleted",
  version: 1,
  schema: PlatformRoleAssignmentDeletedDataSchema,
});
