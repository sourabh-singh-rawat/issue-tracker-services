import { builder } from "@pine/server";

export const UpdateCategoryInput = builder.inputType("UpdateCategoryInput", {
  fields: (t) => ({
    categoryId: t.string({ required: true }),
    code: t.string({ required: false }),
    name: t.string({ required: false }),
    description: t.string({ required: false }),
    parentCategoryId: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});
