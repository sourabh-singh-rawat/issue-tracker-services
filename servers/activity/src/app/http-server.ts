import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { projectActivityRoutes } from "../routes/project-activity.routes";

export const httpServer = fastify({ logger });

httpServer.register(cors, {
  origin: "https://localhost:3000",
  credentials: true,
});
httpServer.register(cookie, { secret: process.env.JWT_SECRET });
httpServer.setErrorHandler(ErrorHandler.handleError);

httpServer.register(projectActivityRoutes, {
  prefix: "/api/v1/activities/projects",
});
