import Type from "typebox";

export const PlatformRoleAssignmentDeletedDataSchema = Type.Object(
  {
    id: Type.String(),
    platformRoleId: Type.String(),
    identityId: Type.String(),
  },
  { additionalProperties: false },
);

export type PlatformRoleAssignmentDeletedData = Type.Static<
  typeof PlatformRoleAssignmentDeletedDataSchema
>;
