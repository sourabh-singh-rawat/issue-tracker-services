import { builder } from "@pine/server";

export const CreateCategoryInput = builder.inputType("CreateCategoryInput", {
  fields: (t) => ({
    code: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string({ required: false }),
    parentCategoryId: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});
