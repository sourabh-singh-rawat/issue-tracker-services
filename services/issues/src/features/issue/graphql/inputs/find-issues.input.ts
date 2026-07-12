import { builder } from "@issue-tracker/graphql-core";

export const FindIssuesInput = builder.inputType("FindIssuesInput", {
  fields: (t) => ({
    parentIssueId: t.string({ required: true }),
  }),
});
