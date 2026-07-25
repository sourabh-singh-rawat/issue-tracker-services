import { defineEvent } from "../../../cloud-events";
import { ProjectMemberDataSchema } from "../schemas";

export const ProjectMemberInvitedEvent = defineEvent({
  type: "issues.project.member-invited",
  version: 1,
  schema: ProjectMemberDataSchema,
});
