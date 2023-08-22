import fastify, { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import * as awilix from "awilix";
import "reflect-metadata";
import { userRoutes } from "./routes/user.routes";
import { CoreUserController } from "./controllers/core-user.controller";
import { CoreUserService } from "./services/core-user.service";
import { PostgresUserRepository } from "./data/repositories/postgres-user.repository";
import { dataSource } from "./configs/typeorm.config";

export const app = fastify();
export const container = awilix.createContainer();

// Application routes registration
app.register(userRoutes, { prefix: "/api/v1/identity" });

// Dependency container registration
container.register({
  postgresContext: awilix.asValue(dataSource),
  userController: awilix.asClass(CoreUserController).singleton(),
  userService: awilix.asClass(CoreUserService).singleton(),
  userRepository: awilix.asClass(PostgresUserRepository),
});

// Plugin registration
app.setErrorHandler(
  (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
    console.log(error);

    return reply.send(
      "Fastify's global error handler responds with something went wrong",
    );
  },
);
