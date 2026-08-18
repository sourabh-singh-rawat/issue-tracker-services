import { builder } from "@pine/server";

export const CreateTenantRelationInput = builder.inputType("CreateTenantRelationInput", {
  fields: (t) => ({
    tenantId: t.string({ required: true }),
    relation: t.string({ required: true }),
    identityId: t.string({ required: true }),
  }),
});
