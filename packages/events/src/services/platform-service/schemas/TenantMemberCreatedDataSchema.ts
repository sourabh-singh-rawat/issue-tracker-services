import Type from "typebox";

export const TenantMemberCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    tenantId: Type.String(),
    tenantRoleId: Type.String(),
    identityId: Type.String(),
    assignedBy: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    assignedAt: Type.String(),
    expiresAt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    reason: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export type TenantMemberCreatedData = Type.Static<typeof TenantMemberCreatedDataSchema>;
