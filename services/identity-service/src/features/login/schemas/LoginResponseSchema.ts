import Type from "typebox";

export const LoginResponseSchema = Type.Object(
  {
    identity: Type.Object(
      {
        id: Type.String({ minLength: 1 }),
        email: Type.String({ format: "email" }),
        emailVerified: Type.Optional(Type.Boolean()),
      },
      { additionalProperties: false },
    ),
    redirectTo: Type.Optional(Type.String({ minLength: 1 })),
  },
  { additionalProperties: false },
);

export type LoginResponse = Type.Static<typeof LoginResponseSchema>;
