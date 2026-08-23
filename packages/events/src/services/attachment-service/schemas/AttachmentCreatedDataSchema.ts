import Type from "typebox";

export const AttachmentCreatedDataSchema = Type.Object(
  {
    id: Type.String(),
    tenantId: Type.String(),
    currentVersionId: Type.Optional(Type.String()),
    status: Type.String(),
    securityStatus: Type.String(),
    createdBy: Type.String(),
    createdAt: Type.String(),
  },
  { additionalProperties: false },
);

export type AttachmentCreatedData = Type.Static<typeof AttachmentCreatedDataSchema>;
