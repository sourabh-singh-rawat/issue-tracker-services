import Type from "typebox";

export const MeIdentitySchema = Type.Object(
  {
    id: Type.String(),
    email: Type.String({ format: "email" }),
  },
  { additionalProperties: false },
);

export type MeIdentity = Type.Static<typeof MeIdentitySchema>;
