import { builder } from "@pine/server";

export const FindIssuesInput = builder.inputType("FindIssuesInput", {
  fields: (t) => ({
    parentIssueId: t.string({ required: true }),
  }),
});
