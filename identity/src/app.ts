import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
import { userRoutes } from "./routes/user.routes";
import {
  Auth,
  ErrorHandler,
  PostgresContext,
} from "@sourabhrawatcc/core-utils";
import { createContainer, asClass, asValue } from "awilix";

import { CoreUserController } from "./controllers/core-user.controller";
import { CoreUserService } from "./services/core-user.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "./data/repositories/postgres-access-token.repository";
import { DataSource } from "typeorm";
import { PostgresRefreshTokenRepository } from "./data/repositories/postgres-refresh-token.repository";

export const app = fastify({ logger: true });
export const container = createContainer();

// Application registration
app.register(cors, { origin: "https://localhost:3000", credentials: true });
app.register(cookie, { secret: process.env.JWT_SECRET });
app.register(swagger, {
  mode: "static",
  specification: { path: "./openapi.json", baseDir: "/usr/src/app" },
});
app.register(userRoutes, { prefix: "/api/v1/identity" });

// Hooks
app.addHook("preHandler", Auth.currentUser);
app.setErrorHandler(ErrorHandler.handleError);

// Database
const source = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: ["src/data/entities/*.ts"],
  // migrations: [],
});
export const dataSource = new PostgresContext(source);

// Dependency container registration
container.register({
  postgresContext: asValue(dataSource),
  userController: asClass(CoreUserController),
  userService: asClass(CoreUserService),
  userRepository: asClass(PostgresUserRepository),
  accessTokenRepository: asClass(PostgresAccessTokenRepository),
  refreshTokenRepository: asClass(PostgresRefreshTokenRepository),
});
