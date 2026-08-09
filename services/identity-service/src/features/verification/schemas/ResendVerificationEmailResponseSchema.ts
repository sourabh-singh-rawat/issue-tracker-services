import Type from "typebox";

export const ResendVerificationEmailResponseSchema = Type.Object(
  {
    message: Type.String(),
  },
  { additionalProperties: false },
);

export type ResendVerificationEmailResponse = Type.Static<
  typeof ResendVerificationEmailResponseSchema
>;
