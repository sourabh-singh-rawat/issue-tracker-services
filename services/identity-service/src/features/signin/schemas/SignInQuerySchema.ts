import Type from "typebox";

export const SignInQuerySchema = Type.Object(
  {
    login_challenge: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type SignInQuery = Type.Static<typeof SignInQuerySchema>;
