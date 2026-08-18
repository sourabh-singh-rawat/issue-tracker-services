import Type from "typebox";

export const PlatformRelationDeletedDataSchema = Type.Object(
  {
    id: Type.String(),
    identityId: Type.String(),
    relation: Type.String(),
  },
  { additionalProperties: false },
);

export type PlatformRelationDeletedData = Type.Static<typeof PlatformRelationDeletedDataSchema>;
