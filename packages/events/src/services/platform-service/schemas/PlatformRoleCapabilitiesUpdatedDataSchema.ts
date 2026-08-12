import Type from "typebox";

export const PlatformRoleCapabilitiesUpdatedDataSchema = Type.Object(
  {
    roleId: Type.String(),
    capabilityKeys: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

export type PlatformRoleCapabilitiesUpdatedData = Type.Static<
  typeof PlatformRoleCapabilitiesUpdatedDataSchema
>;
