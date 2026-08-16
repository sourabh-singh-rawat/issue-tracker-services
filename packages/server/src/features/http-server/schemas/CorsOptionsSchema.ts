import Type from "typebox";

export const CorsOriginSchema = Type.Union([Type.String(), Type.Array(Type.String())]);

export const CorsOptionsSchema = Type.Object(
  {
    credentials: Type.Optional(Type.Boolean()),
    origin: Type.Optional(CorsOriginSchema),
  },
  { additionalProperties: false },
);

export type CorsOrigin = Type.Static<typeof CorsOriginSchema>;
export type CorsOptions = Type.Static<typeof CorsOptionsSchema>;
