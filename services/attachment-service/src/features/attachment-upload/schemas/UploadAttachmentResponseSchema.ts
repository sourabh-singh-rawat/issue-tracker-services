import Type from "typebox";

export const UploadAttachmentResponseSchema = Type.Object({
  status: Type.String(),
});

export type UploadAttachmentResponse = Type.Static<typeof UploadAttachmentResponseSchema>;
