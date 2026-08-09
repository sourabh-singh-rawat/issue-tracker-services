import Type from "typebox";

export const CategoryCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    code: Type.String(),
    name: Type.String(),
    isActive: Type.Boolean(),
    createdAt: Type.String(),
    description: Type.Optional(Type.String()),
    parentCategoryId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type CategoryCreatedData = Type.Static<typeof CategoryCreatedDataSchema>;
