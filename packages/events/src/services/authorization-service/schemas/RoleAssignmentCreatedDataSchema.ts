import Type from "typebox";

export const RoleAssignmentCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    roleId: Type.String(),
    subjectType: Type.String(),
    subjectId: Type.String(),
    scopeType: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    scopeId: Type.Optional(Type.Union([Type.String(), Type.Null()])),
    createdAt: Type.String(),
  },
  { additionalProperties: false },
);

export type RoleAssignmentCreatedData = Type.Static<typeof RoleAssignmentCreatedDataSchema>;
