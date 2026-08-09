import Type from "typebox";

export const MeIdentitySchema = Type.Object(
  {
    id: Type.String(),
  },
  { additionalProperties: false },
);

export type MeIdentity = Type.Static<typeof MeIdentitySchema>;
