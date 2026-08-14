import { builder } from "@pine/server";

export const CreatePlatformRoleInput = builder.inputType("CreatePlatformRoleInput", {
  fields: (t) => ({
    platformId: t.string({ required: true }),
    key: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string({ required: false }),
  }),
});
