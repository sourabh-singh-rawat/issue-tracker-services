import Type from "typebox";

export const TenantRolePermissionsUpdatedDataSchema = Type.Object(
  {
    roleId: Type.String(),
    permissionKeys: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

export type TenantRolePermissionsUpdatedData = Type.Static<
  typeof TenantRolePermissionsUpdatedDataSchema
>;
