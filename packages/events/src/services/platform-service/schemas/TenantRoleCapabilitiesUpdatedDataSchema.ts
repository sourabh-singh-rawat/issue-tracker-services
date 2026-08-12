import Type from "typebox";

export const TenantRoleCapabilitiesUpdatedDataSchema = Type.Object(
  {
    roleId: Type.String(),
    capabilityKeys: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

export type TenantRoleCapabilitiesUpdatedData = Type.Static<
  typeof TenantRoleCapabilitiesUpdatedDataSchema
>;
