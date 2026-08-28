import Type from "typebox";

export const HttpsOptionsSchema = Type.Object(
  {
    key: Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())]),
    cert: Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())]),
    ca: Type.Optional(Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())])),
    requestCert: Type.Optional(Type.Boolean()),
    rejectUnauthorized: Type.Optional(Type.Boolean()),
    allowHTTP1: Type.Optional(Type.Boolean()),
  },
  { additionalProperties: false },
);

export type HttpsOptions = Type.Static<typeof HttpsOptionsSchema>;
