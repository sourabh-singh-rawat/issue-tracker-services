import { builder } from "@pine/server";

export const CreateCapabilityInput = builder.inputType("CreateCapabilityInput", {
  fields: (t) => ({
    service: t.string({ required: true }),
    resource: t.string({ required: true }),
    action: t.string({ required: true }),
  }),
});
