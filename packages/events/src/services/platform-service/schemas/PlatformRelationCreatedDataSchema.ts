import Type from "typebox";

export const PlatformRelationCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    identityId: Type.String(),
    relation: Type.String(),
    createdAt: Type.String(),
  },
  { additionalProperties: false },
);

export type PlatformRelationCreatedData = Type.Static<typeof PlatformRelationCreatedDataSchema>;
