import { builder } from "@pine/server";

export const CreateClientInput = builder.inputType("CreateClientInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    redirectUris: t.stringList({ required: false }),
    scopes: t.stringList({ required: false }),
    grantTypes: t.stringList({ required: true }),
  }),
});
