import { builder } from "@pine/server";

export const UpdateCapabilityInput = builder.inputType("UpdateCapabilityInput", {
  fields: (t) => ({
    key: t.string({ required: true }),
    service: t.string({ required: false }),
    resource: t.string({ required: false }),
    action: t.string({ required: false }),
  }),
});
