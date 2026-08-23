import proxy from "@fastify/http-proxy";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { IncomingHttpHeaders } from "node:http";
import { getCorsOrigins, isAllowedCorsOrigin } from "./cors-origins";
import { env } from "./env";

type ProxyRoute = {
  prefix: string;
  upstream: string;
  proxyPayloads: boolean;
};

const proxyRoutes: ProxyRoute[] = [
  {
    prefix: "/attachments",
    upstream: env.ATTACHMENT_SERVICE_URL,
    proxyPayloads: true,
  },
];

const CORS_RESPONSE_HEADERS: (keyof IncomingHttpHeaders)[] = [
  "access-control-allow-origin",
  "access-control-allow-credentials",
  "access-control-allow-methods",
  "access-control-allow-headers",
  "access-control-expose-headers",
  "access-control-max-age",
];

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
    headers["access-control-allow-methods"] = "GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS";
    headers["access-control-allow-headers"] = "*";
    headers["access-control-expose-headers"] = "*";
    headers["access-control-max-age"] = "86400";
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

const handleCorsPreflight = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void,
  allowedOrigins: string[],
): void => {
  if (request.method === "OPTIONS") {
    const origin = request.headers.origin;
    if (isAllowedCorsOrigin(origin, allowedOrigins) && origin) {
      const requestedHeaders = request.headers["access-control-request-headers"];
      const allowHeaders = typeof requestedHeaders === "string" ? requestedHeaders : "*";

      reply
        .header("access-control-allow-origin", origin)
        .header("access-control-allow-credentials", "true")
        .header("access-control-allow-methods", "GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS")
        .header("access-control-allow-headers", allowHeaders)
        .header("access-control-expose-headers", "*")
        .header("access-control-max-age", "86400")
        .header("vary", "Origin")
        .status(204)
        .send();
      return;
    }
  }
  done();
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
      preHandler: (request, reply, done) =>
        handleCorsPreflight(request, reply, done, allowedOrigins),
      replyOptions: {
        rewriteHeaders: (headers, request) =>
          rewriteProxyHeaders(headers, request, allowedOrigins),
      },
    });
  }
};
