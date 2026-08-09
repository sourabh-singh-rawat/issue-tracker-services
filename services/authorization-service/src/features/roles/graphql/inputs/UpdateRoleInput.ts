import { builder } from "@pine/server";

export const UpdateRoleInput = builder.inputType("UpdateRoleInput", {
  fields: (t) => ({
    roleId: t.string({ required: true }),
    name: t.string({ required: false }),
    description: t.string({ required: false }),
    capabilityKeys: t.stringList({ required: false }),
  }),
});
