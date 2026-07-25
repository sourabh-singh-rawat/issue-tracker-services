import { builder } from "@pine/graphql-core";

export const DeleteIdentityInput = builder.inputType("DeleteIdentityInput", {
  fields: (t) => ({
    identityId: t.string({ required: true }),
  }),
});
