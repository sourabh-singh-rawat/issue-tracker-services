import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { Auth, ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { projectRoutes } from "../routes/project.routes";

export const httpServer = fastify({ logger });

httpServer.register(cors, {
  origin: "https://localhost:3000",
  credentials: true,
});
httpServer.register(cookie, { secret: process.env.JWT_SECRET });
httpServer.addHook("preHandler", Auth.setCurrentUser);
httpServer.setErrorHandler(ErrorHandler.handleError);

httpServer.register(projectRoutes, { prefix: "/api/v1/projects" });
