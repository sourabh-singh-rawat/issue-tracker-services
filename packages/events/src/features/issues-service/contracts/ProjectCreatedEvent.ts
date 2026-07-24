import { defineEvent } from "../../cloud-events/utils";
import { ProjectDataSchema } from "../schemas";

export const ProjectCreatedEvent = defineEvent({
  type: "issues.project.created",
  version: 1,
  schema: ProjectDataSchema,
});
