import Type from "typebox";

export const PlatformMemberDeletedDataSchema = Type.Object(
  {
    id: Type.String(),
    platformRoleId: Type.String(),
    identityId: Type.String(),
  },
  { additionalProperties: false },
);

export type PlatformMemberDeletedData = Type.Static<
  typeof PlatformMemberDeletedDataSchema
>;
