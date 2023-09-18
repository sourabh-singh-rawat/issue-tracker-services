import { createContainer, asValue, asClass } from "awilix";
import {
  PostgresContext,
  AwilixServiceContainer,
  NatsMessageServer,
} from "@sourabhrawatcc/core-utils";
import { logger } from "./logger.config";
import { dataSource } from "./db.config";
import { messageServer } from "./message-system.config";

import { CoreIdentityController } from "../controllers/core-identity.controller";
import { CoreIdentityService } from "../services/core-identity.service";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "../data/repositories/postgres-access-token.repository";
import { PostgresRefreshTokenRepository } from "../data/repositories/postgres-refresh-token.repository";

import { UserRepository } from "../data/repositories/interfaces/user-repository";
import { AccessTokenRepository } from "../data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "../data/repositories/interfaces/refresh-token-repository";
import { IdentityService } from "../services/interfaces/identity-service";
import { IdentityController } from "../controllers/interfaces/identity-controller";

import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscribers";
import { UserUpdatedSubscriber } from "../messages/subscribers/user-updated.subscribers";

export interface Services {
  postgresContext: PostgresContext;
  messageServer: NatsMessageServer;
  identityController: IdentityController;
  identityService: IdentityService;
  userRepository: UserRepository;
  accessTokenRepository: AccessTokenRepository;
  refreshTokenRepository: RefreshTokenRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
}

const awilix = createContainer<Services>();
export const container = new AwilixServiceContainer<Services>(awilix, logger);

const { add } = container;

add("postgresContext", asValue(dataSource));
add("messageServer", asValue(messageServer));
add("identityController", asClass(CoreIdentityController));
add("identityService", asClass(CoreIdentityService));
add("userRepository", asClass(PostgresUserRepository));
add("accessTokenRepository", asClass(PostgresAccessTokenRepository));
add("refreshTokenRepository", asClass(PostgresRefreshTokenRepository));

// Subscriptions
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
