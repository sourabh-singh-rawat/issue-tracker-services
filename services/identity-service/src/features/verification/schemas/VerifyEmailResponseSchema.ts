import Type from "typebox";

export const VerifyEmailResponseSchema = Type.Object(
  {
    message: Type.String(),
  },
  { additionalProperties: false },
);

export type VerifyEmailResponse = Type.Static<typeof VerifyEmailResponseSchema>;
