import { builder } from "@pine/server";

export const CreateProductInput = builder.inputType("CreateProductInput", {
  fields: (t) => ({
    code: t.string({ required: true }),
    sku: t.string({ required: true }),
    name: t.string({ required: true }),
    productType: t.string({ required: true }),
    description: t.string({ required: false }),
    categoryId: t.string({ required: false }),
    brandId: t.string({ required: false }),
    defaultUnitId: t.string({ required: true }),
    isActive: t.boolean({ required: false }),
  }),
});
