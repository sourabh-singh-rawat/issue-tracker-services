import Type from "typebox";

export const CreateUploadTargetBodySchema = Type.Object(
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

export type CreateUploadTargetBody = Type.Static<typeof CreateUploadTargetBodySchema>;
