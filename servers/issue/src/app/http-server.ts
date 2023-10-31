import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { issueRoutes } from "../routes/issue.routes";
import { issueCommentRoutes } from "../routes/issue-comment.routes";
import { issueTaskRoutes } from "../routes/issue-task.routes";

export const httpServer = fastify({ logger });

httpServer.register(cors, {
  origin: "https://localhost:3000",
  credentials: true,
});
httpServer.register(cookie, { secret: process.env.JWT_SECRET });
httpServer.setErrorHandler(ErrorHandler.handleError);

httpServer.register(issueRoutes, { prefix: "/api/v1/issues" });
httpServer.register(issueCommentRoutes, { prefix: "/api/v1/issues" });
httpServer.register(issueTaskRoutes, { prefix: "/api/v1/issues" });
