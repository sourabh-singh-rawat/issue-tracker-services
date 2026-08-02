import { defineEvent } from "../../../cloud-events";
import { RoleAssignmentCreatedDataSchema } from "../schemas";

export const RoleAssignmentCreatedEvent = defineEvent({
  type: "authorization.role-assignment.created",
  version: 1,
  schema: RoleAssignmentCreatedDataSchema,
});
