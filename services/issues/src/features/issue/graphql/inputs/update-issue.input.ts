import { builder } from "@issue-tracker/graphql-core";

export const UpdateIssueInput = builder.inputType("UpdateIssueInput", {
  fields: (t) => ({
    issueId: t.string({ required: true }),
    name: t.string({ required: false }),
    type: t.string({ required: false }),
    statusId: t.string({ required: false }),
    priority: t.string({ required: false }),
    dueDate: t.field({ type: "DateTimeISO", required: false }),
    description: t.string({ required: false }),
    estimate: t.int({ required: false }),
    component: t.string({ required: false }),
  }),
});
