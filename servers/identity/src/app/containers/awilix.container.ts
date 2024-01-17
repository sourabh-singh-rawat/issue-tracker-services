import { Logger } from "pino";
import { createContainer, asValue, asClass, InjectionMode } from "awilix";
import {
  logger,
  AwilixContainer,
  Messenger,
  TypeormStore,
} from "@sourabhrawatcc/core-utils";
import { store } from "../stores/postgres-typeorm.store";
import { messenger } from "../messengers/nats.messenger";

import { IdentityController } from "../../controllers/interfaces/identity-controller";
import { IdentityService } from "../../services/interfaces/identity.service";
import { UserRepository } from "../../data/repositories/interfaces/user-repository";

import { CoreIdentityController } from "../../controllers/core-identity.controller";
import { CoreIdentityService } from "../../services/core-identity.service";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { PostgresAccessTokenRepository } from "../../data/repositories/postgres-access-token.repository";
import { PostgresRefreshTokenRepository } from "../../data/repositories/postgres-refresh-token.repository";
import { UserCreatedSubscriber } from "../../messages/subscribers/user-created.subscribers";
import { UserUpdatedSubscriber } from "../../messages/subscribers/user-updated.subscribers";
import { AccessTokenRepository } from "../../data/repositories/interfaces/access-token-repository";
import { RefreshTokenRepository } from "../../data/repositories/interfaces/refresh-token-repository";
import { UserService } from "../../services/interfaces/user.service";
import { CoreUserService } from "../../services/core-user.service";

export interface RegisteredServices {
  store: TypeormStore;
  logger: Logger;
  messenger: Messenger;
  identityController: IdentityController;
  identityService: IdentityService;
  userService: UserService;
  userRepository: UserRepository;
  accessTokenRepository: AccessTokenRepository;
  refreshTokenRepository: RefreshTokenRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
  userUpdatedSubscriber: UserUpdatedSubscriber;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});

export const container = new AwilixContainer<RegisteredServices>(
  awilix,
  logger,
);

const { add } = container;

add("store", asValue(store));
add("logger", asValue(logger));
add("messenger", asValue(messenger));
add("identityController", asClass(CoreIdentityController));
add("userService", asClass(CoreUserService));
add("identityService", asClass(CoreIdentityService));
add("userRepository", asClass(PostgresUserRepository));
add("accessTokenRepository", asClass(PostgresAccessTokenRepository));
add("refreshTokenRepository", asClass(PostgresRefreshTokenRepository));
add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
add("userUpdatedSubscriber", asClass(UserUpdatedSubscriber));
