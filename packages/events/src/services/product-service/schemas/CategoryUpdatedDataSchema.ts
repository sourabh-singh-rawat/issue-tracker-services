import Type from "typebox";

export const CategoryUpdatedDataSchema = Type.Object(
  {
    id: Type.String(),
    code: Type.String(),
    name: Type.String(),
    isActive: Type.Boolean(),
    updatedAt: Type.String(),
    description: Type.Optional(Type.String()),
    parentCategoryId: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type CategoryUpdatedData = Type.Static<typeof CategoryUpdatedDataSchema>;
