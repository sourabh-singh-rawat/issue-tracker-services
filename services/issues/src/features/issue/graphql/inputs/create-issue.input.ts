import { builder } from "@issue-tracker/graphql-core";

export const CreateIssueInput = builder.inputType("CreateIssueInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    type: t.string({ required: true }),
    projectId: t.string({ required: true }),
    parentIssueId: t.string({ required: false }),
    statusId: t.id({ required: true }),
    priority: t.string({ required: true }),
    dueDate: t.field({ type: "DateTimeISO", required: false }),
    description: t.string({ required: false }),
    assigneeIds: t.stringList({ required: true }),
    estimate: t.int({ required: false }),
    component: t.string({ required: false }),
  }),
});
