import { builder } from "@pine/graphql-core";

export const FindIssuesInput = builder.inputType("FindIssuesInput", {
  fields: (t) => ({
    parentIssueId: t.string({ required: true }),
  }),
});
