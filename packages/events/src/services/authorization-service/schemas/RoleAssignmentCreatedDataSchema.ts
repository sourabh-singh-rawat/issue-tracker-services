import Type from "typebox";

export const RoleAssignmentCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    roleId: Type.String(),
    identityType: Type.String(),
    identityId: Type.String(),
    assignedBy: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    assignedAt: Type.String(),
    expiresAt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    revokedAt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    reason: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export type RoleAssignmentCreatedData = Type.Static<typeof RoleAssignmentCreatedDataSchema>;
