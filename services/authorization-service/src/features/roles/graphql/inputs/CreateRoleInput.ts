import { builder } from "@pine/graphql-core";

export const CreateRoleInput = builder.inputType("CreateRoleInput", {
  fields: (t) => ({
    key: t.string({ required: true }),
    name: t.string({ required: true }),
    description: t.string({ required: false }),
    capabilityKeys: t.stringList({ required: false }),
  }),
});
