import { builder } from "@pine/graphql-core";

export const RegisterUserInput = builder.inputType("RegisterUserInput", {
  fields: (t) => ({
    email: t.string({ required: true }),
    password: t.string({ required: true }),
  }),
});
