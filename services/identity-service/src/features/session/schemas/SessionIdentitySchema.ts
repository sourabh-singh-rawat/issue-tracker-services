import Type from "typebox";

export const SessionIdentitySchema = Type.Object(
  {
    id: Type.String(),
    email: Type.Optional(Type.String({ format: "email" })),
    emailVerified: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

export type SessionIdentity = Type.Static<typeof SessionIdentitySchema>;
