import Type from "typebox";

export const CreateAttachmentErrorSchema = Type.Object(
  { message: Type.String(), statusCode: Type.Optional(Type.Number()) },
  { additionalProperties: true, description: "Error response" },
);

export type CreateAttachmentError = Type.Static<typeof CreateAttachmentErrorSchema>;
