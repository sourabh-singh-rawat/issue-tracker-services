import { fastifyApolloHandler } from "@as-integrations/fastify";
import { attachHttpServer } from "@pine/server";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";
import { env, listenPortFromUrl } from "./env";
import { getCorsOrigins } from "./cors-origins";
import type { GatewayContext } from "./graphql-gateway";
import { graphqlServer } from "./graphql-server";
import { registerHttpProxies } from "./http-proxy";
import { registerSwagger } from "./swagger";

function resolveEnvironment(value: string) {
  if (value === "production" || value === "development" || value === "test") {
    return value;
  }
  return "development";
}

export const createHttpServer = async () => {
  const server = fastify();

  await registerSwagger(server);
  await registerHttpProxies(server);
  await graphqlServer.start();

  server.route({
    url: "/graphql",
    method: ["POST", "GET"],
    schema: { hide: true },
    handler: fastifyApolloHandler(graphqlServer, {
      context: async (req: FastifyRequest, reply: FastifyReply): Promise<GatewayContext> => ({
        cookie: req.headers.cookie,
        reply,
      }),
    }),
  });

  return attachHttpServer(server, {
    cors: {
      credentials: true,
      origin: getCorsOrigins(),
    },
    config: {
      host: "0.0.0.0",
      port: listenPortFromUrl(env.API_GATEWAY_URL),
      environment: resolveEnvironment(env.NODE_ENV),
      version: 1,
    },
    routes: [],
  });
};

