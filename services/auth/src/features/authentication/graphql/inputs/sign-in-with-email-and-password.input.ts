import { builder } from "@issue-tracker/graphql-core";

export const SignInWithEmailAndPasswordInput = builder.inputType(
  "SignInWithEmailAndPasswordInput",
  {
    fields: (t) => ({
      email: t.string({ required: true }),
      password: t.string({ required: true }),
    }),
  },
);
