import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance, RawServerBase } from "fastify";
import { existsSync } from "node:fs";
import path from "node:path";
import { env } from "./env";

const PLATFORM_OPENAPI_PATH = path.join(process.cwd(), "dist", "platform.openapi.json");

type OpenApiServer = { url: string; description?: string };
type OpenApiPathItem = { servers?: OpenApiServer[]; [key: string]: unknown };
type OpenApiDocument = {
  info: { title: string; description?: string; version: string; [key: string]: unknown };
  servers?: OpenApiServer[];
  paths?: Record<string, OpenApiPathItem>;
  [key: string]: unknown;
};

const rewriteServersForGateway = (
  document: OpenApiDocument,
  gatewayUrl: string,
): OpenApiDocument => {
  const gatewayServer: OpenApiServer = { url: gatewayUrl, description: "API Gateway" };

  const paths = Object.fromEntries(
    Object.entries(document.paths ?? {}).map(([pathKey, pathItem]) => {
      if (!pathItem || typeof pathItem !== "object") {
        return [pathKey, pathItem];
      }
      const { servers: _pathServers, ...rest } = pathItem;
      return [pathKey, rest];
    }),
  );

  const title = document.info.title.includes("Platform")
    ? document.info.title
    : "Pine Platform API";

  return {
    ...document,
    info: {
      ...document.info,
      title,
      description:
        document.info.description ??
        "Composed OpenAPI for REST APIs exposed through the API gateway.",
    },
    servers: [gatewayServer],
    paths,
  };
};

export const registerSwagger = async <RawServer extends RawServerBase>(
  server: FastifyInstance<RawServer>,
): Promise<void> => {
  // Relative URL keeps Try-it-out on the same origin as /docs (avoids localhost vs 127.0.0.1 CSP/CORS).
  const gatewayUrl = "/";
  const gatewayOrigin = new URL(env.API_GATEWAY_URL).origin;
  const loopbackOrigin = gatewayOrigin.includes("127.0.0.1")
    ? gatewayOrigin.replace("127.0.0.1", "localhost")
    : gatewayOrigin.replace("localhost", "127.0.0.1");

  if (!existsSync(PLATFORM_OPENAPI_PATH)) {
    console.warn(
      `[swagger] Missing ${PLATFORM_OPENAPI_PATH}. Run \`pnpm openapi:compose\` after services write their OpenAPI specs. Swagger UI will not be registered.`,
    );
    return;
  }

  await server.register(swagger, {
    mode: "static",
    specification: {
      path: PLATFORM_OPENAPI_PATH,
      baseDir: path.dirname(PLATFORM_OPENAPI_PATH),
      postProcessor: (swaggerObject) =>
        rewriteServersForGateway(
          swaggerObject as unknown as OpenApiDocument,
          gatewayUrl,
        ) as typeof swaggerObject,
    },
  });

  await server.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: true,
      tryItOutEnabled: true,
    },
    staticCSP: true,
    transformStaticCSP: (header) =>
      // Allow fetch/XHR to the gateway when opened as localhost or 127.0.0.1
      `${header} connect-src 'self' ${gatewayOrigin} ${loopbackOrigin};`,
  });
};
