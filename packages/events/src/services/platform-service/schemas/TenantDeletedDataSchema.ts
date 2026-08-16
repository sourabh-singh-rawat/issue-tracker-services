import Type from "typebox";

export const TenantDeletedDataSchema = Type.Object(
  {
    id: Type.String(),
    platformId: Type.String(),
  },
  { additionalProperties: false },
);

export type TenantDeletedData = Type.Static<typeof TenantDeletedDataSchema>;
