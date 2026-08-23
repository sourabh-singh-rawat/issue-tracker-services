import cors from "@fastify/cors";
import { attachHttpServer } from "@pine/server";
import fastify from "fastify";
import { getCorsOrigins, isAllowedCorsOrigin } from "./cors-origins";
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
  const allowedOrigins = getCorsOrigins();

  await server.register(cors, {
    credentials: true,
    origin: (origin, cb) => {
      if (!origin || isAllowedCorsOrigin(origin, allowedOrigins)) {
        cb(null, true);
        return;
      }
      cb(new Error("Not allowed by CORS"), false);
    },
    methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["*"],
    exposedHeaders: ["*"],
  });

  await registerHttpProxies(server);

  return attachHttpServer(server, {
    config: {
      host: "0.0.0.0",
      port: listenPortFromUrl(env.DATA_GATEWAY_URL),
      environment: resolveEnvironment(env.NODE_ENV),
      version: 1,
    },
    routes: [],
  });
};
