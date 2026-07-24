import proxy from "@fastify/http-proxy";
import type { FastifyInstance } from "fastify";
import { env } from "../env";

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

export const registerHttpProxies = async (server: FastifyInstance): Promise<void> => {
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
    });
  }
};
