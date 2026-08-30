import Type from "typebox";

export const TenantRelationDeletedDataSchema = Type.Object(
  {
    id: Type.String(),
    tenantId: Type.String(),
    identityId: Type.String(),
    relation: Type.String(),
  },
  { additionalProperties: false },
);

export type TenantRelationDeletedData = Type.Static<typeof TenantRelationDeletedDataSchema>;
