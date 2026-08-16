import Type from "typebox";

export const TenantMemberDeletedDataSchema = Type.Object(
  {
    id: Type.String(),
    tenantId: Type.String(),
    tenantRoleId: Type.String(),
    identityId: Type.String(),
  },
  { additionalProperties: false },
);

export type TenantMemberDeletedData = Type.Static<typeof TenantMemberDeletedDataSchema>;
