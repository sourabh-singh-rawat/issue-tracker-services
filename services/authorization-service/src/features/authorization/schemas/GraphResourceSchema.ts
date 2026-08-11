import Type from "typebox";

export const GraphResourceSchema = Type.Object(
  {
    type: Type.String({ minLength: 1 }),
    id: Type.String({ minLength: 1 }),
  },
  { additionalProperties: false },
);

export type GraphResourceBody = Type.Static<typeof GraphResourceSchema>;
