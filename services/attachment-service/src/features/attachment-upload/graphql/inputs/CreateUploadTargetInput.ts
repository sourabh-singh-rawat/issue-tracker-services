import { builder } from "@pine/server";

export const CreateUploadTargetInput = builder.inputType("CreateUploadTargetInput", {
  fields: (t) => ({
    tenantId: t.string({ required: true }),
    filename: t.string({ required: true }),
    contentType: t.string({ required: true }),
    size: t.int({ required: true }),
  }),
});
