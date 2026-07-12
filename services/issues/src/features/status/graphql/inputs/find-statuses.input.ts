import { builder } from "@issue-tracker/graphql-core";

export const FindStatusesOptions = builder.inputType("FindStatusesOptions", {
  fields: (t) => ({
    projectId: t.string({ required: true }),
  }),
});
