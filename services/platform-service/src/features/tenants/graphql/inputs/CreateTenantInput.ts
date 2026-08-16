import { builder } from "@pine/server";

export const CreateTenantInput = builder.inputType("CreateTenantInput", {
  fields: (t) => ({
    platformId: t.string({ required: true }),
    name: t.string({ required: true }),
    slug: t.string({ required: true }),
    description: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});
