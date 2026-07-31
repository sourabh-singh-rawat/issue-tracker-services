import Type from "typebox";

export const SignInBodySchema = Type.Object(
  {
    email: Type.String({ format: "email" }),
    password: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type SignInBody = Type.Static<typeof SignInBodySchema>;
