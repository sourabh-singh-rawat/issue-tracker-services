import Type from "typebox";

export const IdentitySchema = Type.Object(
  {
    id: Type.String(),
    email: Type.String({ format: "email" }),
    emailVerified: Type.Boolean(),
  },
  { additionalProperties: false },
);

export type Identity = Type.Static<typeof IdentitySchema>;
