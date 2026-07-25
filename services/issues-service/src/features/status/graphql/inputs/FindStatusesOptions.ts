import { builder } from "@pine/graphql-core";

export const FindStatusesOptions = builder.inputType("FindStatusesOptions", {
  fields: (t) => ({
    projectId: t.string({ required: true }),
  }),
});
