import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { issueRoutes } from "../../routes/issue.routes";
import { issueCommentRoutes } from "../../routes/issue-comment.routes";
import { issueTaskRoutes } from "../../routes/issue-task.routes";

export const fastifyServer = fastify({ logger });

fastifyServer.register(cors, {
  origin: "https://localhost:3000",
  credentials: true,
});
fastifyServer.register(cookie, { secret: process.env.JWT_SECRET });
fastifyServer.setErrorHandler(ErrorHandler.handleError);

fastifyServer.register(issueRoutes, { prefix: "/api/v1/issues" });
fastifyServer.register(issueCommentRoutes, { prefix: "/api/v1/issues" });
fastifyServer.register(issueTaskRoutes, { prefix: "/api/v1/issues" });
