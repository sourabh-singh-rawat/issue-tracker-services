import "./env";

import {
  NatsBroker,
  NatsPublisher,
  Publisher,
  Subjects,
} from "@issue-tracker/event-bus";
import {
  AwilixDi,
  CoreLogger,
  Logger,
} from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import pino from "pino";
import { DataSource } from "typeorm";
import {
  CoreUserAuthenticationService,
  CoreUserProfileService,
  UserAuthenticationService,
  UserEmailConfirmationSentSubscriber,
  UserProfileService,
} from "@/features/authentication";

export const logger = new CoreLogger(
  pino({ transport: { target: "pino-pretty" } }),
);

export const broker = new NatsBroker({
  servers: [process.env.NATS_CLUSTER_URL || "nats"],
  streams: ["user"],
  logger,
});

export interface RegisteredServices {
  dataSource: DataSource;
  logger: Logger;
  publisher: Publisher<Subjects>;
  userEmailConfirmationSentSubscriber: UserEmailConfirmationSentSubscriber;
  userAuthenticationService: UserAuthenticationService;
  userProfileService: UserProfileService;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});

export const container = new AwilixDi<RegisteredServices>(awilix, logger);

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.AUTH_POSTGRES_CLUSTER_URL,
  entities: ["src/features/authentication/entities/*.ts"],
  synchronize: true,
});

container.add("dataSource", asValue(dataSource));
container.add("logger", asValue(logger));
container.add("broker", asValue(broker));
container.add("publisher", asClass(NatsPublisher));
container.add(
  "userAuthenticationService",
  asClass(CoreUserAuthenticationService),
);
container.add("userProfileService", asClass(CoreUserProfileService));
container.add(
  "userEmailConfirmationSentSubscriber",
  asClass(UserEmailConfirmationSentSubscriber),
);
