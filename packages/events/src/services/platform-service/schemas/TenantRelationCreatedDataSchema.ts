import Type from "typebox";

export const TenantRelationCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    tenantId: Type.String(),
    identityId: Type.String(),
    relation: Type.String(),
    createdAt: Type.String(),
  },
  { additionalProperties: false },
);

export type TenantRelationCreatedData = Type.Static<typeof TenantRelationCreatedDataSchema>;
