import { builder } from "@pine/graphql-core";

export const CreateWorkspaceInput = builder.inputType("CreateWorkspaceInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    id: t.string({ required: false }),
    description: t.string({ required: false }),
  }),
});
