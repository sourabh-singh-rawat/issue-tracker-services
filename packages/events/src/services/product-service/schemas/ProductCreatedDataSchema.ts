import Type from "typebox";

export const ProductCreatedProductUnitSchema = Type.Object(
  {
    id: Type.String(),
    productId: Type.String(),
    unitId: Type.String(),
    baseUnitMultiplier: Type.String(),
    isBaseUnit: Type.Boolean(),
    isActive: Type.Boolean(),
    createdAt: Type.String(),
  },
  { additionalProperties: false },
);

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
    productUnits: Type.Array(ProductCreatedProductUnitSchema, { minItems: 1 }),
  },
  { additionalProperties: false },
);

export type ProductCreatedProductUnit = Type.Static<typeof ProductCreatedProductUnitSchema>;
export type ProductCreatedData = Type.Static<typeof ProductCreatedDataSchema>;
