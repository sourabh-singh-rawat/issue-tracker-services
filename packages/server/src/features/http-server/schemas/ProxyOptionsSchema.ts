import Type from "typebox";

export const ProxyRouteSchema = Type.Object({
  prefix: Type.String({ minLength: 1 }),
  upstream: Type.String({ minLength: 1 }),
  proxyPayloads: Type.Optional(Type.Boolean({ default: true })),
  rewritePrefix: Type.Optional(Type.String()),
  undici: Type.Optional(
    Type.Object({
      headersTimeout: Type.Optional(Type.Number()),
      bodyTimeout: Type.Optional(Type.Number()),
    }),
  ),
});

export const ProxyOptionsSchema = Type.Object({
  routes: Type.Array(ProxyRouteSchema),
  undici: Type.Optional(
    Type.Object({
      headersTimeout: Type.Optional(Type.Number()),
      bodyTimeout: Type.Optional(Type.Number()),
    }),
  ),
});

export type ProxyRoute = Type.Static<typeof ProxyRouteSchema>;
export type ProxyOptions = Type.Static<typeof ProxyOptionsSchema>;
