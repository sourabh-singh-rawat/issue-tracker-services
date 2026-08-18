import Type from "typebox";

export const ProfileGenderUpdatedDataSchema = Type.Object(
  {
    id: Type.String(),
    identityId: Type.String(),
  },
  { additionalProperties: false },
);

export type ProfileGenderUpdatedData = Type.Static<typeof ProfileGenderUpdatedDataSchema>;
