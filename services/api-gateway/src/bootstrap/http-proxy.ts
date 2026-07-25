import proxy from "@fastify/http-proxy";
import type { IncomingHttpHeaders } from "node:http";
import type { FastifyInstance } from "fastify";
import { env } from "../env";
import { getCorsOrigins, isAllowedCorsOrigin } from "./cors-origins";

type ProxyRoute = {
  prefix: string;
  upstream: string;
  proxyPayloads: boolean;
};

const proxyRoutes: ProxyRoute[] = [
  {
    prefix: "/identity",
    upstream: env.IDENTITY_SERVICE_URL,
    proxyPayloads: true,
  },
  {
    prefix: "/attachments",
    upstream: env.ATTACHMENT_SERVICE_URL,
    proxyPayloads: true,
  },
];

const CORS_RESPONSE_HEADERS = [
  "access-control-allow-origin",
  "access-control-allow-credentials",
  "access-control-allow-methods",
  "access-control-allow-headers",
  "access-control-expose-headers",
  "access-control-max-age",
] as const;

const rewriteProxyHeaders = (
  headers: IncomingHttpHeaders,
  request: { headers: { origin?: string } } | undefined,
  allowedOrigins: string[],
): IncomingHttpHeaders => {
  for (const name of CORS_RESPONSE_HEADERS) {
    delete headers[name];
  }

  const origin = request?.headers.origin;
  if (isAllowedCorsOrigin(origin, allowedOrigins) && origin) {
    headers["access-control-allow-origin"] = origin;
    headers["access-control-allow-credentials"] = "true";
    const vary = headers.vary;
    if (typeof vary === "string" && vary.length > 0) {
      if (!/\borigin\b/i.test(vary)) {
        headers.vary = `${vary}, Origin`;
      }
    } else {
      headers.vary = "Origin";
    }
  }

  return headers;
};

export const registerHttpProxies = async (server: FastifyInstance): Promise<void> => {
  const allowedOrigins = getCorsOrigins();

  for (const route of proxyRoutes) {
    await server.register(proxy, {
      upstream: route.upstream,
      prefix: route.prefix,
      rewritePrefix: route.prefix,
      proxyPayloads: route.proxyPayloads,
      undici: {
        headersTimeout: 60_000,
        bodyTimeout: 120_000,
      },
      replyOptions: {
        rewriteHeaders: (headers, request) =>
          rewriteProxyHeaders(headers, request, allowedOrigins),
      },
    });
  }
};
