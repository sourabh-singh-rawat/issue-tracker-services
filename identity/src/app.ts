import fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import swagger from "@fastify/swagger";
import { DataSource } from "typeorm";
import { createContainer, asClass, asValue } from "awilix";
import {
  Auth,
  ErrorHandler,
  PostgresContext,
} from "@sourabhrawatcc/core-utils";

import { CoreUserController } from "./controllers/core-user.controller";
import { CoreUserService } from "./services/core-user.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "./data/repositories/postgres-access-token.repository";
import { PostgresRefreshTokenRepository } from "./data/repositories/postgres-refresh-token.repository";
import { userRoutes } from "./routes/user.routes";
import { UserRepository } from "./data/repositories/interfaces/user-repository.interface";
import { AccessTokenRepository } from "./data/repositories/interfaces/access-token-repository.interface";
import { RefreshTokenRepository } from "./data/repositories/interfaces/refresh-token-repository.interface";
import { UserProfileRepository } from "./data/repositories/interfaces/user-profile.repository.interface";
import { UserService } from "./services/interfaces/user-service.interface";
import { UserController } from "./controllers/interfaces/user-controller.interface";
import { PostgresUserProfileRepository } from "./data/repositories/postgres-user-profile.repository";

export const app = fastify({ logger: true });

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
export const container = createContainer<Injectables>();
const { register } = container;

register({
  postgresContext: asValue(dataSource),
  userController: asClass(CoreUserController),
  userService: asClass(CoreUserService),
  userRepository: asClass(PostgresUserRepository),
  accessTokenRepository: asClass(PostgresAccessTokenRepository),
  refreshTokenRepository: asClass(PostgresRefreshTokenRepository),
  userProfileRepository: asClass(PostgresUserProfileRepository),
});

export interface Injectables {
  postgresContext: PostgresContext;
  userController: UserController;
  userService: UserService;
  userRepository: UserRepository;
  accessTokenRepository: AccessTokenRepository;
  refreshTokenRepository: RefreshTokenRepository;
  userProfileRepository: UserProfileRepository;
}
