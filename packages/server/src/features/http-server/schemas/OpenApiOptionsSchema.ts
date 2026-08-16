import Type from "typebox";

export const OpenApiInfoSchema = Type.Object(
  {
    title: Type.String(),
    version: Type.String(),
    description: Type.Optional(Type.String()),
    license: Type.Optional(
      Type.Object(
        {
          name: Type.String(),
          url: Type.Optional(Type.String()),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const OpenApiServerSchema = Type.Object(
  {
    url: Type.String(),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export const OpenApiTagSchema = Type.Object(
  {
    name: Type.String(),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export const OpenApiSecuritySchemeSchema = Type.Union([
  Type.Object(
    {
      type: Type.Literal("http"),
      scheme: Type.String(),
      bearerFormat: Type.Optional(Type.String()),
      description: Type.Optional(Type.String()),
    },
    { additionalProperties: false },
  ),
  Type.Object(
    {
      type: Type.Literal("apiKey"),
      name: Type.String(),
      in: Type.Union([Type.Literal("query"), Type.Literal("header"), Type.Literal("cookie")]),
      description: Type.Optional(Type.String()),
    },
    { additionalProperties: false },
  ),
]);

export const OpenApiOptionsSchema = Type.Object(
  {
    info: OpenApiInfoSchema,
    servers: Type.Optional(Type.Array(OpenApiServerSchema)),
    tags: Type.Optional(Type.Array(OpenApiTagSchema)),
    securitySchemes: Type.Optional(Type.Record(Type.String(), OpenApiSecuritySchemeSchema)),
  },
  { additionalProperties: false },
);

export type OpenApiInfo = Type.Static<typeof OpenApiInfoSchema>;
export type OpenApiServer = Type.Static<typeof OpenApiServerSchema>;
export type OpenApiTag = Type.Static<typeof OpenApiTagSchema>;
export type OpenApiSecurityScheme = Type.Static<typeof OpenApiSecuritySchemeSchema>;
export type OpenApiOptions = Type.Static<typeof OpenApiOptionsSchema>;
