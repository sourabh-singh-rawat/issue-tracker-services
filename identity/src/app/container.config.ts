import { createContainer, asValue, asClass } from "awilix";
import {
  PostgresContext,
  AwilixServiceContainer,
} from "@sourabhrawatcc/core-utils";
import { logger } from "./logger.config";
import { dataSource } from "./db.config";

import { CoreUserController } from "../controllers/core-user.controller";
import { CoreUserService } from "../services/core-user.service";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "../data/repositories/postgres-access-token.repository";
import { PostgresRefreshTokenRepository } from "../data/repositories/postgres-refresh-token.repository";
import { PostgresUserProfileRepository } from "../data/repositories/postgres-user-profile.repository";

import { UserRepository } from "../data/repositories/interfaces/user-repository";
import { AccessTokenRepository } from "../data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "../data/repositories/interfaces/refresh-token-repository";
import { UserProfileRepository } from "../data/repositories/interfaces/user-profile.repository";
import { UserService } from "../services/interfaces/user-service";
import { UserController } from "../controllers/interfaces/user-controller";

export interface Services {
  postgresContext: PostgresContext;
  userController: UserController;
  userService: UserService;
  userRepository: UserRepository;
  accessTokenRepository: AccessTokenRepository;
  refreshTokenRepository: RefreshTokenRepository;
  userProfileRepository: UserProfileRepository;
}

const awilix = createContainer<Services>();
export const container = new AwilixServiceContainer<Services>(awilix, logger);

const { add } = container;

add("postgresContext", asValue(dataSource));
add("userController", asClass(CoreUserController));
add("userService", asClass(CoreUserService));
add("userRepository", asClass(PostgresUserRepository));
add("userService", asClass(CoreUserService));
add("accessTokenRepository", asClass(PostgresAccessTokenRepository));
add("refreshTokenRepository", asClass(PostgresRefreshTokenRepository));
add("userProfileRepository", asClass(PostgresUserProfileRepository));
