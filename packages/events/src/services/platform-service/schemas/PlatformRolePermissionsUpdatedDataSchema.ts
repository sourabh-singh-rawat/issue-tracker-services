import Type from "typebox";

export const PlatformRolePermissionsUpdatedDataSchema = Type.Object(
  {
    roleId: Type.String(),
    permissionKeys: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

export type PlatformRolePermissionsUpdatedData = Type.Static<
  typeof PlatformRolePermissionsUpdatedDataSchema
>;
