import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
import { Auth, ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { identityRoutes } from "../routes/identity.routes";

export const httpServer = fastify({ logger });

httpServer.register(cors, {
  origin: "https://localhost:3000",
  credentials: true,
});
httpServer.register(cookie, { secret: process.env.JWT_SECRET });
httpServer.register(swagger, {
  mode: "static",
  specification: {
    path: "src/app/generated/openapi.config.yaml",
    baseDir: "/usr/src/app",
  },
});
httpServer.addHook("preHandler", Auth.setCurrentUser);
httpServer.setErrorHandler(ErrorHandler.handleError);

httpServer.register(identityRoutes, { prefix: "/api/v1/identity" });
