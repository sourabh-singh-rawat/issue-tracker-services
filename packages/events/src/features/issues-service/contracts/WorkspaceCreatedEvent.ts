import { defineEvent } from "../../cloud-events/utils";
import { WorkspaceCreatedDataSchema } from "../schemas";

export const WorkspaceCreatedEvent = defineEvent({
  type: "issues.workspace.created",
  version: 1,
  schema: WorkspaceCreatedDataSchema,
});
