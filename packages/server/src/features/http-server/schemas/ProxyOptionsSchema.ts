import Type from "typebox";

const UndiciConnectSchema = Type.Object(
  {
    ca: Type.Optional(Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())])),
    cert: Type.Optional(Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())])),
    key: Type.Optional(Type.Union([Type.String(), Type.Unsafe<Buffer>(Type.Unknown())])),
  },
  { additionalProperties: false },
);

const UndiciOptionsSchema = Type.Object(
  {
    headersTimeout: Type.Optional(Type.Number()),
    bodyTimeout: Type.Optional(Type.Number()),
    connect: Type.Optional(UndiciConnectSchema),
  },
  { additionalProperties: false },
);

export const ProxyRouteSchema = Type.Object({
  prefix: Type.String({ minLength: 1 }),
  upstream: Type.String({ minLength: 1 }),
  proxyPayloads: Type.Optional(Type.Boolean({ default: true })),
  rewritePrefix: Type.Optional(Type.String()),
  undici: Type.Optional(UndiciOptionsSchema),
});

export const ProxyOptionsSchema = Type.Object({
  routes: Type.Array(ProxyRouteSchema),
  undici: Type.Optional(UndiciOptionsSchema),
});

export type ProxyRoute = Type.Static<typeof ProxyRouteSchema>;
export type ProxyOptions = Type.Static<typeof ProxyOptionsSchema>;
