import Type from "typebox";

export const AttachmentScannedDataSchema = Type.Object(
  {
    scanId: Type.String(),
    attachmentId: Type.String(),
    versionId: Type.String(),
    scopeType: Type.Union([Type.Literal("IDENTITY"), Type.Literal("ORGANIZATION")]),
    scopeId: Type.String(),
    tenantId: Type.Optional(Type.String()),
    type: Type.String(),
    status: Type.String(),
    scanner: Type.Optional(Type.String()),
    durationMs: Type.Optional(Type.Number()),
    result: Type.Optional(
      Type.Object(
        {
          isInfected: Type.Optional(Type.Boolean()),
          threats: Type.Optional(Type.Array(Type.String())),
          rawOutput: Type.Optional(Type.String()),
        },
        { additionalProperties: false },
      ),
    ),
    scannedAt: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export type AttachmentScannedData = Type.Static<typeof AttachmentScannedDataSchema>;
