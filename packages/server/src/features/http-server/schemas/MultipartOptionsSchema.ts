import Type from "typebox";

export const MultipartOptionsSchema = Type.Object(
  {
    fileSize: Type.Optional(Type.Integer()),
    files: Type.Optional(Type.Integer()),
    fields: Type.Optional(Type.Integer()),
  },
  { additionalProperties: false },
);

export type MultipartOptions = Type.Static<typeof MultipartOptionsSchema>;
