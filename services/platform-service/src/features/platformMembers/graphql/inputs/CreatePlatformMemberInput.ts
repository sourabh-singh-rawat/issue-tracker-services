import { builder } from "@pine/server";

export const CreatePlatformMemberInput = builder.inputType(
  "CreatePlatformMemberInput",
  {
    fields: (t) => ({
      platformId: t.string({ required: true }),
      platformRoleId: t.string({ required: true }),
      identityId: t.string({ required: true }),
      expiresAt: t.field({ type: "DateTimeISO", required: false }),
      reason: t.string({ required: false }),
    }),
  },
);
