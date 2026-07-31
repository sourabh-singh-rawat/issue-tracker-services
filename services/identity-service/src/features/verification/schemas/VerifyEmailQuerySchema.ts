import Type from "typebox";

export const VerifyEmailQuerySchema = Type.Object(
  {
    flow: Type.String({ minLength: 1 }),
    code: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type VerifyEmailQuery = Type.Static<typeof VerifyEmailQuerySchema>;
