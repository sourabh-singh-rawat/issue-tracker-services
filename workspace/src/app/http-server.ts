import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { Auth, ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { workspaceRoutes } from "../routes/workspace.routes";

export const httpServer = fastify({ logger });

httpServer.register(cors, {
  origin: "https://localhost:3000",
  credentials: true,
});
httpServer.register(cookie, { secret: process.env.JWT_SECRET });
httpServer.addHook("preHandler", Auth.requireTokens);
httpServer.addHook("preHandler", Auth.setCurrentUser);
httpServer.addHook("preHandler", Auth.requireAuth);
httpServer.setErrorHandler(ErrorHandler.handleError);

httpServer.register(workspaceRoutes, { prefix: "/api/v1/workspaces" });
