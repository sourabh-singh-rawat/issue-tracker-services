import { builder } from "@pine/server";

export const UpdatePlatformMemberInput = builder.inputType(
  "UpdatePlatformMemberInput",
  {
    fields: (t) => ({
      id: t.string({ required: true }),
      platformId: t.string({ required: true }),
      expiresAt: t.field({ type: "DateTimeISO", required: false }),
      reason: t.string({ required: false }),
    }),
  },
);
