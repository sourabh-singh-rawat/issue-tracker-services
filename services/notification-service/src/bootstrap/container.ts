import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import { IIdentityRepository, IdentityRepository, NotificationIdentitySyncConsumer } from "@/features/identities";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<NotificationIdentitySyncConsumer>(TYPES.NotificationIdentitySyncConsumer).to(NotificationIdentitySyncConsumer);
