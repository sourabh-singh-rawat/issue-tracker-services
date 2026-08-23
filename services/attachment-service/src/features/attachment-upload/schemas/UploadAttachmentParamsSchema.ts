import Type from "typebox";

export const UploadAttachmentParamsSchema = Type.Object(
  { id: Type.String({ format: "uuid" }) },
  { additionalProperties: false },
);

export type UploadAttachmentParams = Type.Static<typeof UploadAttachmentParamsSchema>;
