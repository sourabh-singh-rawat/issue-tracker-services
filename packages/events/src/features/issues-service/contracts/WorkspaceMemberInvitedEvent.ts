import { defineEvent } from "../../cloud-events/utils";
import { WorkspaceMemberInvitedDataSchema } from "../schemas";

export const WorkspaceMemberInvitedEvent = defineEvent({
  type: "issues.workspace.member-invited",
  version: 1,
  schema: WorkspaceMemberInvitedDataSchema,
});
