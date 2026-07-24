import { defineEvent } from "../../cloud-events/utils";
import { IssueCreatedDataSchema } from "../schemas";

export const IssueCreatedEvent = defineEvent({
  type: "issues.issue.created",
  version: 1,
  schema: IssueCreatedDataSchema,
});
