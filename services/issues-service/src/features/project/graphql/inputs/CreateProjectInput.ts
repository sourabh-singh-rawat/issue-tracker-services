import { builder } from "@pine/graphql-core";

export const CreateProjectInput = builder.inputType("CreateProjectInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
  }),
});
