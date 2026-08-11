import Type from "typebox";

export const CheckRelationshipResponseSchema = Type.Object(
  {
    allowed: Type.Boolean(),
  },
  { additionalProperties: false },
);

export type CheckRelationshipResponse = Type.Static<typeof CheckRelationshipResponseSchema>;
