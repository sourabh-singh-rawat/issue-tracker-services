import { asClass, asValue, createContainer } from "awilix";
import {
  AwilixServiceContainer,
  NatsMessageServer,
  PostgresContext,
} from "@sourabhrawatcc/core-utils";
import { logger } from "./logger.config";
import { dataSource } from "./db.config";
import { messageServer } from "./message-system.config";
import { UserCreatedSubscriber } from "../messages/subscribers/user-created.subscribers";

export interface Services {
  postgresContext: PostgresContext;
  messageServer: NatsMessageServer;
  userCreatedSubscriber: UserCreatedSubscriber;
}

const awilix = createContainer<Services>();
export const container = new AwilixServiceContainer<Services>(awilix, logger);

const { add } = container;

add("postgresContext", asValue(dataSource));
add("messageServer", asValue(messageServer));

add("userCreatedSubscriber", asClass(UserCreatedSubscriber));
