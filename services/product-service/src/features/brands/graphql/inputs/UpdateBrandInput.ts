import { builder } from "@pine/graphql-core";

export const UpdateBrandInput = builder.inputType("UpdateBrandInput", {
  fields: (t) => ({
    brandId: t.string({ required: true }),
    code: t.string({ required: false }),
    name: t.string({ required: false }),
    description: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});
