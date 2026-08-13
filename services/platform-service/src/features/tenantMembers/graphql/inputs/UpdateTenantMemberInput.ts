import { builder } from "@pine/server";

export const UpdateTenantMemberInput = builder.inputType("UpdateTenantMemberInput", {
  fields: (t) => ({
    expiresAt: t.field({ type: "DateTimeISO", required: false }),
    reason: t.string({ required: false }),
  }),
});
