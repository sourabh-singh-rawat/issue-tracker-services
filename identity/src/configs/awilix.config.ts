import { asValue, asClass } from "awilix";
import { dataSource } from "../configs/typeorm.config";
import { CoreUserController } from "../controllers/core-user.controller";
import { CoreUserService } from "../services/core-user.service";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";

export const containerValues = {
  postgresContext: asValue(dataSource),
  userController: asClass(CoreUserController).singleton(),
  userService: asClass(CoreUserService).singleton(),
  userRepository: asClass(PostgresUserRepository),
};
