import Type from "typebox";

export const DeleteRelationshipResponseSchema = Type.Object(
  {
    deleted: Type.Boolean(),
  },
  { additionalProperties: false },
);

export type DeleteRelationshipResponse = Type.Static<typeof DeleteRelationshipResponseSchema>;
