import fastify from "fastify";
import swagger from "@fastify/swagger";
import { createContainer } from "awilix";
import { userRoutes } from "./routes/user.routes";
import { containerValues } from "./configs/awilix.config";
import { handleError } from "./common/error-handler.util";
import "reflect-metadata";

export const app = fastify();
export const container = createContainer();

// Application registration
app.register(userRoutes, { prefix: "/api/v1/identity" });
app.register(swagger, {
  mode: "static",
  specification: { path: "./openapi.json", baseDir: "/usr/src/app" },
});
app.setErrorHandler(handleError);

// Dependency container registration
container.register(containerValues);
