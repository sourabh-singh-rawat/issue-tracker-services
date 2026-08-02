import { NatsPublisher, type IPublisher } from "@pine/events";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import {
  type IOrganizationRepository,
  type IOrganizationService,
  OrganizationRepository,
  OrganizationService,
} from "@/features/organizations";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container
  .bind<IOrganizationRepository>(TYPES.OrganizationRepository)
  .to(OrganizationRepository);
container.bind<IOrganizationService>(TYPES.OrganizationService).to(OrganizationService);
