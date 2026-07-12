import { builder } from "@issue-tracker/graphql-core";

export const CreateProjectInput = builder.inputType("CreateProjectInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    workspaceId: t.string({ required: true }),
  }),
});
