import Type from "typebox";

export const CorsOriginSchema = Type.Union([Type.String(), Type.Array(Type.String())]);

export const CorsOptionsSchema = Type.Object(
  {
    credentials: Type.Optional(Type.Boolean()),
    origin: Type.Optional(CorsOriginSchema),
    methods: Type.Optional(Type.Union([Type.Array(Type.String()), Type.String()])),
    allowedHeaders: Type.Optional(Type.Union([Type.Array(Type.String()), Type.String()])),
    exposedHeaders: Type.Optional(Type.Union([Type.Array(Type.String()), Type.String()])),
  },
  { additionalProperties: false },
);

export type CorsOrigin = Type.Static<typeof CorsOriginSchema>;
export type CorsOptions = Type.Static<typeof CorsOptionsSchema>;
