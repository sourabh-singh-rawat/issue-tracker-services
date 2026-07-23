import Type from "typebox";

export const CreateAttachmentCreatedSchema = Type.Null({
  description: "Created successfully",
});

export type CreateAttachmentCreated = Type.Static<typeof CreateAttachmentCreatedSchema>;
