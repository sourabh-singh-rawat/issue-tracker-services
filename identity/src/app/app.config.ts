import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
import { Auth, ErrorHandler } from "@sourabhrawatcc/core-utils";
import { identityRoutes } from "../routes/identity.routes";
import { logger } from "./logger.config";

export const app = fastify({ logger });

app.register(cors, { origin: "https://localhost:3000", credentials: true });
app.register(cookie, { secret: process.env.JWT_SECRET });
app.register(swagger, {
  mode: "static",
  specification: {
    path: "src/app/generated/openapi.config.yaml",
    baseDir: "/usr/src/app",
  },
});
app.addHook("preHandler", Auth.currentUser);
app.setErrorHandler(ErrorHandler.handleError);

app.register(identityRoutes, { prefix: "/api/v1/identity" });
