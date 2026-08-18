import Type from "typebox";

export const ProfileDeletedDataSchema = Type.Object(
  {
    id: Type.String(),
    identityId: Type.String(),
  },
  { additionalProperties: false },
);

export type ProfileDeletedData = Type.Static<typeof ProfileDeletedDataSchema>;
