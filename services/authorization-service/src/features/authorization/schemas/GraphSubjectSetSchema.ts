import Type from "typebox";

export const GraphSubjectSetSchema = Type.Object(
  {
    type: Type.String({ minLength: 1 }),
    id: Type.String({ minLength: 1 }),
    relation: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type GraphSubjectSetBody = Type.Static<typeof GraphSubjectSetSchema>;
