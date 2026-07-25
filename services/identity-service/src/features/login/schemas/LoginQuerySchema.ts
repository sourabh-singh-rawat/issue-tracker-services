import Type from "typebox";

export const LoginQuerySchema = Type.Object(
  {
    login_challenge: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type LoginQuery = Type.Static<typeof LoginQuerySchema>;
