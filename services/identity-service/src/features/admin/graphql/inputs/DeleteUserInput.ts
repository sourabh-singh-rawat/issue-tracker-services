import { builder } from "@pine/graphql-core";

export const DeleteUserInput = builder.inputType("DeleteUserInput", {
  fields: (t) => ({
    userId: t.string({ required: true }),
  }),
});
