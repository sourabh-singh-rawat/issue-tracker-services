import Type from "typebox";

export const IdentitySchema = Type.Object(
  {
    id: Type.String({ minLength: 1 }),
    email: Type.String(),
    emailVerified: Type.Boolean(),
  },
  { additionalProperties: false },
);

export type Identity = Type.Static<typeof IdentitySchema>;
