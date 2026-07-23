import Type from "typebox";

export const LoginIdentitySchema = Type.Object(
  {
    id: Type.String(),
    email: Type.String({ format: "email" }),
    emailVerified: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

export type LoginIdentity = Type.Static<typeof LoginIdentitySchema>;
