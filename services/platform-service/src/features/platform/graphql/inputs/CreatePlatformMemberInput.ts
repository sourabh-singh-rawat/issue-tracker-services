import { builder } from "@pine/server";

export const CreatePlatformMemberInput = builder.inputType("CreatePlatformMemberInput", {
  fields: (t) => ({
    relation: t.string({ required: true }),
    identityId: t.string({ required: true }),
  }),
});
