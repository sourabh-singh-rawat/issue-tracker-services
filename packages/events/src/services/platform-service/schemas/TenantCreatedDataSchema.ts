import Type from "typebox";

export const TenantCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    platformId: Type.String(),
    name: Type.String(),
    slug: Type.String(),
    isActive: Type.Boolean(),
    version: Type.Integer({ minimum: 1 }),
    createdAt: Type.String(),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type TenantCreatedData = Type.Static<typeof TenantCreatedDataSchema>;
