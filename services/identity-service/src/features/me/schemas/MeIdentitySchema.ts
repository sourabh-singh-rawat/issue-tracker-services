import Type from "typebox";

export const MeIdentitySchema = Type.Object(
  {
    id: Type.String(),
    email: Type.String({ format: "email" }),
    emailVerified: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

export type MeIdentity = Type.Static<typeof MeIdentitySchema>;
