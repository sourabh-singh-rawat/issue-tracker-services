import Type from "typebox";

export const CreateUploadTargetResponseSchema = Type.Object(
  {
    objectId: Type.String(),
    url: Type.String(),
    headers: Type.Record(Type.String(), Type.String()),
    expiresAt: Type.String(),
  },
  { additionalProperties: false },
);

export type CreateUploadTargetResponse = Type.Static<typeof CreateUploadTargetResponseSchema>;
