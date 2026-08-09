import { builder } from "@pine/server";

export const UpdateUnitInput = builder.inputType("UpdateUnitInput", {
  fields: (t) => ({
    unitId: t.string({ required: true }),
    code: t.string({ required: false }),
    name: t.string({ required: false }),
    symbol: t.string({ required: false }),
    isActive: t.boolean({ required: false }),
  }),
});
