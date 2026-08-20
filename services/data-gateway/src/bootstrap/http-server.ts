import { attachHttpServer } from "@pine/server";
import fastify from "fastify";
import { getCorsOrigins } from "./cors-origins";
import { env, listenPortFromUrl } from "./env";
import { registerHttpProxies } from "./http-proxy";

const resolveEnvironment = (value: string) => {
  if (value === "production" || value === "development" || value === "test") {
    return value;
  }
  return "development";
};

export const createHttpServer = async () => {
  const server = fastify();
  await registerHttpProxies(server);

  return attachHttpServer(server, {
    cors: {
      credentials: true,
      origin: getCorsOrigins(),
    },
    config: {
      host: "0.0.0.0",
      port: listenPortFromUrl(env.DATA_GATEWAY_URL),
      environment: resolveEnvironment(env.NODE_ENV),
      version: 1,
    },
    routes: [],
  });
};
