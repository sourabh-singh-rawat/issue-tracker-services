import Type from "typebox";

export const RoleCapabilityUpdatedDataSchema = Type.Object(
  {
    roleId: Type.String(),
    capabilityKeys: Type.Array(Type.String()),
  },
  { additionalProperties: false },
);

export type RoleCapabilityUpdatedData = Type.Static<typeof RoleCapabilityUpdatedDataSchema>;
