import { createHttpServer, readTlsFile, type IHttpServer } from "@pine/server";
import { Container } from "inversify";
import { TYPES } from "./container-types";
import { env, listenPortFromUrl } from "./env";

const resolveEnvironment = (value: string) => {
  if (value === "production" || value === "development" || value === "test") {
    return value;
  }
  return "development";
};

export const container = new Container({ defaultScope: "Singleton" });

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  createHttpServer({
    https: {
      key: readTlsFile(env.DATA_GATEWAY_TLS_KEY_PATH),
      cert: readTlsFile(env.DATA_GATEWAY_TLS_CERT_PATH),
    },
    cors: {
      credentials: true,
      origin: [env.ERP_WEB_URL, env.IDENTITY_WEB_URL, env.VITE_PLATFORM_WEB_URL],
      methods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"],
    },
    config: {
      host: "0.0.0.0",
      port: listenPortFromUrl(env.DATA_GATEWAY_URL),
      environment: resolveEnvironment(env.NODE_ENV),
      version: 1,
    },
    proxy: {
      routes: [
        {
          prefix: "/attachments",
          upstream: env.ATTACHMENT_SERVICE_URL,
          proxyPayloads: true,
        },
      ],
    },
    routes: [],
  }),
);
