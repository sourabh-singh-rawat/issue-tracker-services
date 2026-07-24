import { builder } from "@pine/graphql-core";

export const FindProjectsOptions = builder.inputType("FindProjectsOptions", {
  fields: (t) => ({
    workspaceId: t.string({ required: false }),
  }),
});
