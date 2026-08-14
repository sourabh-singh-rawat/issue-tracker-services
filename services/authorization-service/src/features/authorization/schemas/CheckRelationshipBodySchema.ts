import Type from "typebox";

export const CheckRelationshipBodySchema = Type.Object(
  {
    namespace: Type.String({ minLength: 1 }),
    object: Type.String({ minLength: 1 }),
    relation: Type.String({ minLength: 1 }),
    subject: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type CheckRelationshipBody = Type.Static<typeof CheckRelationshipBodySchema>;
