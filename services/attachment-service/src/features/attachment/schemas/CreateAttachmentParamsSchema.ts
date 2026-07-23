import Type from "typebox";

export const CreateAttachmentParamsSchema = Type.Object(
  { issueId: Type.String({ format: "uuid" }) },
  { additionalProperties: false },
);

export type CreateAttachmentParams = Type.Static<typeof CreateAttachmentParamsSchema>;
