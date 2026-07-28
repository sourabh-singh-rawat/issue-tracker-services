import Type from "typebox";

export const ProductCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    code: Type.String(),
    sku: Type.String(),
    name: Type.String(),
    productType: Type.String(),
    isActive: Type.Boolean(),
    createdAt: Type.String(),
    description: Type.Optional(Type.String()),
    categoryId: Type.Optional(Type.String()),
    brandId: Type.Optional(Type.String()),
    defaultUnitId: Type.String(),
  },
  { additionalProperties: false },
);

export type ProductCreatedData = Type.Static<typeof ProductCreatedDataSchema>;
