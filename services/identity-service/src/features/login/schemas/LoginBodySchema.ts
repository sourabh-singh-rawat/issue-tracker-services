import Type from "typebox";

export const LoginBodySchema = Type.Object(
  {
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type LoginBody = Type.Static<typeof LoginBodySchema>;
