import { builder } from "@pine/server";

export const CreateTenantMemberInput = builder.inputType("CreateTenantMemberInput", {
  fields: (t) => ({
    tenantId: t.string({ required: true }),
    roleId: t.string({ required: true }),
    identityId: t.string({ required: true }),
    expiresAt: t.field({ type: "DateTimeISO", required: false }),
    reason: t.string({ required: false }),
  }),
});
