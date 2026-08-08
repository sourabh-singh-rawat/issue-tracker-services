import { fastifyApolloHandler } from "@as-integrations/fastify";
import { FastifyHttpServer } from "@pine/http";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";
import { env, listenPortFromUrl } from "./env";
import { getCorsOrigins } from "./cors-origins";
import type { GatewayContext } from "./graphql-gateway";
import { graphqlServer } from "./graphql-server";
import { registerHttpProxies } from "./http-proxy";
import { registerSwagger } from "./swagger";

export const createHttpServer = async () => {
  const server = fastify();

  await registerSwagger(server);
  await registerHttpProxies(server);
  await graphqlServer.start();

  return new FastifyHttpServer(server, {
    cors: {
      credentials: true,
      origin: getCorsOrigins(),
    },
    config: {
      host: "0.0.0.0",
      port: listenPortFromUrl(env.API_GATEWAY_URL),
      environment: env.NODE_ENV as "development" | "production",
      version: 1,
    },
    routes: [
      {
        url: "/graphql",
        method: ["POST", "GET"],
        schema: { hide: true },
        handler: fastifyApolloHandler(graphqlServer, {
          context: async (req: FastifyRequest, reply: FastifyReply): Promise<GatewayContext> => ({
            cookie: req.headers.cookie,
            reply,
          }),
        }),
      },
    ],
  });
};
