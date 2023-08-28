import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import { createContainer } from "awilix";
import { userRoutes } from "./routes/user.routes";
import { containerValues } from "./configs/awilix.config";
import { ErrorHandler } from "@sourabhrawatcc/core-utils";

export const app = fastify({ logger: true });
export const container = createContainer();

// Application registration
app.register(cors, { origin: "http://localhost:3000", credentials: true });
app.register(userRoutes, { prefix: "/api/v1/identity" });
app.register(swagger, {
  mode: "static",
  specification: { path: "./openapi.json", baseDir: "/usr/src/app" },
});

app.setErrorHandler(ErrorHandler.handleError);

// Dependency container registration
container.register(containerValues);
