import Type from "typebox";

export const HttpsOptionsSchema = Type.Object(
  {
    key: Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())]),
    cert: Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())]),
    ca: Type.Optional(Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())])),
    allowHTTP1: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

export type HttpsOptions = Type.Static<typeof HttpsOptionsSchema>;
