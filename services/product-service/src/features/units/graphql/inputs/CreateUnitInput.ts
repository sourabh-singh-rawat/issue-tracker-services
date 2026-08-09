import { builder } from "@pine/server";

export const CreateUnitInput = builder.inputType("CreateUnitInput", {
  fields: (t) => ({
    code: t.string({ required: true }),
    name: t.string({ required: true }),
    symbol: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});
