import Type from "typebox";

export const ResendVerificationEmailBodySchema = Type.Object(
  {
    email: Type.String({ format: "email" }),
  },
  { additionalProperties: false },
);

export type ResendVerificationEmailBody = Type.Static<typeof ResendVerificationEmailBodySchema>;
