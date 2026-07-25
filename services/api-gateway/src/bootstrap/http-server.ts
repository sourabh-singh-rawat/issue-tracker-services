import { FastifyHttpServer } from "@pine/http-core";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";
import { env } from "../env";
import type { GatewayContext } from "./graphql-gateway";
import { graphqlServer } from "./graphql-server";
import { registerHttpProxies } from "./http-proxy";
import { registerSwagger } from "./swagger";

export const createHttpServer = async () => {
  const server = fastify();

  await registerSwagger(server);
  await registerHttpProxies(server);

  return new FastifyHttpServer({
    graphql: {
      path: "/graphql",
      apollo: graphqlServer,
      createContext: async (req: FastifyRequest, reply: FastifyReply): Promise<GatewayContext> => ({
        cookie: req.headers.cookie,
        reply,
      }),
    },
    cors: {
      credentials: true,
      origin: [
        env.ISSUES_WEB_CLIENT_URL,
        env.IDENTITY_WEB_CLIENT_URL,
        env.INVENTORY_WEB_CLIENT_URL,
        // Swagger UI /docs on the gateway (localhost vs 127.0.0.1 is cross-origin)
        `http://localhost:${env.API_GATEWAY_PORT}`,
        `http://127.0.0.1:${env.API_GATEWAY_PORT}`,
      ],
    },
    config: {
      host: "0.0.0.0",
      port: Number.parseInt(env.API_GATEWAY_PORT, 10),
      environment: env.NODE_ENV as "development" | "production",
      version: 1,
    },
    server,
  });
};
