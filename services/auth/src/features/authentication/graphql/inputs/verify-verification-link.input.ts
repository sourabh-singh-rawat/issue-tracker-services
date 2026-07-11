import { builder } from "@issue-tracker/graphql-core";

export const VerifyVerificationLinkInput = builder.inputType(
  "VerifyVerificationLinkInput",
  {
    fields: (t) => ({
      token: t.string({ required: true }),
    }),
  },
);
