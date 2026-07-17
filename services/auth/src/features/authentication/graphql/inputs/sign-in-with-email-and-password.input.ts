import { builder } from "@pine/graphql-core";

export const SignInWithEmailAndPasswordInput = builder.inputType(
  "SignInWithEmailAndPasswordInput",
  {
    fields: (t) => ({
      email: t.string({ required: true }),
      password: t.string({ required: true }),
    }),
  },
);
