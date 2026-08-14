import { builder } from "@pine/server";

export const UpdatePlatformRoleInput = builder.inputType("UpdatePlatformRoleInput", {
  fields: (t) => ({
    id: t.string({ required: true }),
    platformId: t.string({ required: true }),
    name: t.string({ required: false }),
    description: t.string({ required: false }),
  }),
});
