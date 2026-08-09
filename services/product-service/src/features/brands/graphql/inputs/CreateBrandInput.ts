import { builder } from "@pine/server";

export const CreateBrandInput = builder.inputType("CreateBrandInput", {
  fields: (t) => ({
    code: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});
