import { builder } from "@pine/server";

export const CreatePlatformRelationInput = builder.inputType("CreatePlatformRelationInput", {
  fields: (t) => ({
    relation: t.string({ required: true }),
    identityId: t.string({ required: true }),
  }),
});
