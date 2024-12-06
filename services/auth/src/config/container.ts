import { NatsPublisher, Publisher, Subjects } from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { AppLogger, AwilixDi, logger } from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import {
  CoreUserAuthenticationService,
  CoreUserProfileService,
  UserAuthenticationService,
  UserEmailConfirmationSentSubscriber,
  UserProfileService,
} from "../app";
import { dataSource } from "../data";
import { broker } from "./broker";

export interface RegisteredServices {
  orm: Typeorm;
  logger: AppLogger;
  publisher: Publisher<Subjects>;
  userEmailConfirmationSentSubscriber: UserEmailConfirmationSentSubscriber;
  userAuthenticationService: UserAuthenticationService;
  userProfileService: UserProfileService;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});
export const container = new AwilixDi<RegisteredServices>(awilix, logger);

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
