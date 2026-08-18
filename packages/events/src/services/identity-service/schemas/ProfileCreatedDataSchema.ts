import Type from "typebox";

export const ProfileCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    identityId: Type.String(),
  },
  { additionalProperties: false },
);

export type ProfileCreatedData = Type.Static<typeof ProfileCreatedDataSchema>;
