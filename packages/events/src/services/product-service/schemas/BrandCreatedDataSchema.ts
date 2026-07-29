import Type from "typebox";

export const BrandCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    code: Type.String(),
    name: Type.String(),
    isActive: Type.Boolean(),
    version: Type.Integer({ minimum: 1 }),
    createdAt: Type.String(),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type BrandCreatedData = Type.Static<typeof BrandCreatedDataSchema>;
