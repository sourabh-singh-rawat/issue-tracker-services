import { defineEvent } from "../../cloud-events/utils";
import { ProjectDataSchema } from "../schemas";

export const ProjectUpdatedEvent = defineEvent({
  type: "issues.project.updated",
  version: 1,
  schema: ProjectDataSchema,
});
