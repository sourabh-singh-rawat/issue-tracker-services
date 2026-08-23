import Type from "typebox";

export const CreateUploadTargetInputSchema = Type.Object(
  {
    tenantId: Type.String(),
    filename: Type.String(),
    contentType: Type.String(),
    size: Type.Integer(),
    operationId: Type.Optional(Type.String()),
    metadata: Type.Optional(Type.Record(Type.String(), Type.Unknown())),
  },
  { additionalProperties: false },
);

export type CreateUploadTargetInput = Type.Static<typeof CreateUploadTargetInputSchema>;
