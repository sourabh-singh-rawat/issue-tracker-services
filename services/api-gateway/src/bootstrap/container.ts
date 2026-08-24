import { HttpIdentityClient } from "@pine/identity";
import { createGraphQLServer, createHttpServer, readTlsFile, type IHttpServer } from "@pine/server";
import { Container } from "inversify";
import { TYPES } from "./container-types";
import { env, listenPortFromUrl } from "./env";
import { graphqlGateway } from "./graphql-gateway";

const resolveEnvironment = (value: string) => {
  if (value === "production" || value === "development" || value === "test") {
    return value;
  }
  return "development";
};

const identityClient = new HttpIdentityClient({ baseUrl: env.IDENTITY_SERVICE_URL });

export const container = new Container({ defaultScope: "Singleton" });

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  createHttpServer({
    https: {
      key: readTlsFile(env.API_GATEWAY_TLS_KEY_PATH),
      cert: readTlsFile(env.API_GATEWAY_TLS_CERT_PATH),
    },
    cors: {
      credentials: true,
      origin: [env.ERP_WEB_URL, env.IDENTITY_WEB_URL, env.VITE_PLATFORM_WEB_URL],
    },
    config: {
      host: "0.0.0.0",
      port: listenPortFromUrl(env.API_GATEWAY_URL),
      environment: resolveEnvironment(env.NODE_ENV),
      version: 1,
    },
    hooks: {
      onRequest: [(request) => identityClient.resolveRequestIdentity(request)],
    },
    graphql: createGraphQLServer({
      gateway: graphqlGateway,
      context: async (req) => ({
        identityId: req.identity?.id,
        authMethod: req.identity?.authMethod,
      }),
    }),
    proxy: {
      routes: [
        { prefix: "/identity", upstream: env.IDENTITY_SERVICE_URL, proxyPayloads: true },
        { prefix: "/attachments", upstream: env.ATTACHMENT_SERVICE_URL, proxyPayloads: true },
        { prefix: "/inventory", upstream: env.INVENTORY_SERVICE_URL, proxyPayloads: true },
        { prefix: "/products", upstream: env.PRODUCT_SERVICE_URL, proxyPayloads: true },
        { prefix: "/authorization", upstream: env.AUTHORIZATION_SERVICE_URL, proxyPayloads: true },
      ],
    },
    routes: [],
  }),
);
