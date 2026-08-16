import Type from "typebox";

export const EnsureRelationshipResponseSchema = Type.Object(
  {
    created: Type.Boolean(),
  },
  { additionalProperties: false },
);

export type EnsureRelationshipResponse = Type.Static<typeof EnsureRelationshipResponseSchema>;
