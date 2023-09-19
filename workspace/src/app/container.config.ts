import { asClass, asValue, createContainer } from "awilix";
import {
  AwilixServiceContainer,
  NatsMessageServer,
  PostgresContext,
} from "@sourabhrawatcc/core-utils";
import { logger } from "./logger.config";
import { dataSource } from "./db.config";
import { messageServer } from "./message-system.config";
import { UserRepository } from "../data/repositories/interface/user-repository";
import { PostgresUserRepository } from "../data/repositories/postgres-user.repository";
import { WorkspaceRepository } from "../data/repositories/interface/workspace-repository";
import { PostgresWorkspaceRepository } from "../data/repositories/postgres-workspace.repository";

import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscribers";

export interface Services {
  postgresContext: PostgresContext;
  messageServer: NatsMessageServer;
  userRepository: UserRepository;
  workspaceRepository: WorkspaceRepository;
  userCreatedSubscriber: UserCreatedSubscriber;
}

const awilix = createContainer<Services>();
export const container = new AwilixServiceContainer<Services>(awilix, logger);

const { add } = container;

add("postgresContext", asValue(dataSource));
add("messageServer", asValue(messageServer));

add("userRepository", asClass(PostgresUserRepository));
add("workspaceRepository", asClass(PostgresWorkspaceRepository));

add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
