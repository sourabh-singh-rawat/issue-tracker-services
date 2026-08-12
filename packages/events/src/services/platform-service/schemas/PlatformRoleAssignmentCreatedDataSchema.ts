import Type from "typebox";

export const PlatformRoleAssignmentCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    platformRoleId: Type.String(),
    identityId: Type.String(),
    assignedBy: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    assignedAt: Type.String(),
    expiresAt: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    reason: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  },
  { additionalProperties: false },
);

export type PlatformRoleAssignmentCreatedData = Type.Static<
  typeof PlatformRoleAssignmentCreatedDataSchema
>;
