import Type from "typebox";

export const CreateAttachmentBodySchema = Type.Object(
  { file: Type.String({ format: "binary" }) },
  { additionalProperties: false },
);

export type CreateAttachmentBody = Type.Static<typeof CreateAttachmentBodySchema>;
