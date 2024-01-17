import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { Auth, ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { userRoutes } from "../../routes/user.routes";

export const server = fastify({ logger });

server.register(cors, {
  origin: "https://localhost:3000",
  credentials: true,
});
server.register(cookie, { secret: process.env.JWT_SECRET });
server.setErrorHandler(ErrorHandler.handleError);

server.register(userRoutes, { prefix: "/api/v1/users" });
