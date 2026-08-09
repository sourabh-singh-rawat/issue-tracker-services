import { builder } from "@pine/server";

export const DeleteIdentityInput = builder.inputType("DeleteIdentityInput", {
  fields: (t) => ({
    identityId: t.string({ required: true }),
  }),
});
