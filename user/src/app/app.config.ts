import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { Auth, ErrorHandler, logger } from "@sourabhrawatcc/core-utils";
import { userRoutes } from "../routes/user.routes";

export const app = fastify({ logger });

app.register(cors, { origin: "https://localhost:3000", credentials: true });
app.register(cookie, { secret: process.env.JWT_SECRET });
app.addHook("preHandler", Auth.currentUser);
app.setErrorHandler(ErrorHandler.handleError);

app.register(userRoutes, { prefix: "/api/v1/users" });
