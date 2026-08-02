import { builder } from "@pine/graphql-core";

export const CreateCapabilityInput = builder.inputType("CreateCapabilityInput", {
  fields: (t) => ({
    key: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string({ required: false }),
  }),
});
