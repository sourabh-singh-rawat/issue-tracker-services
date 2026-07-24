import Type from "typebox";

export const RegisterResponseSchema = Type.Object(
  {
    message: Type.String(),
  },
  { additionalProperties: false },
);

export type RegisterResponse = Type.Static<typeof RegisterResponseSchema>;
