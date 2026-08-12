import { builder } from "@pine/server";

export const UpdatePlatformRoleAssignmentInput = builder.inputType(
  "UpdatePlatformRoleAssignmentInput",
  {
    fields: (t) => ({
      id: t.string({ required: true }),
      expiresAt: t.field({ type: "DateTimeISO", required: false }),
      reason: t.string({ required: false }),
    }),
  },
);
