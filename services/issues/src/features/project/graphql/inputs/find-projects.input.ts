import { builder } from "@issue-tracker/graphql-core";

export const FindProjectsOptions = builder.inputType("FindProjectsOptions", {
  fields: (t) => ({
    workspaceId: t.string({ required: false }),
  }),
});
