import Type from "typebox";

export const BrandUpdatedDataSchema = Type.Object(
  {
    id: Type.String(),
    code: Type.String(),
    name: Type.String(),
    isActive: Type.Boolean(),
    version: Type.Integer({ minimum: 1 }),
    updatedAt: Type.String(),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type BrandUpdatedData = Type.Static<typeof BrandUpdatedDataSchema>;
