import { builder } from "@pine/graphql-core";

export const UpdateCapabilityInput = builder.inputType("UpdateCapabilityInput", {
  fields: (t) => ({
    key: t.string({ required: true }),
    name: t.string({ required: false }),
    description: t.string({ required: false }),
  }),
});
