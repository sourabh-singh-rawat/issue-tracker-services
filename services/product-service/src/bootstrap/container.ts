import { NatsPublisher, type IPublisher } from "@pine/events";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import { BrandRepository, type IBrandRepository, BrandService, type IBrandService } from "@/features/brands";
import { IIdentityRepository, IdentityRepository } from "@/features/identities";
import { IMeService, MeService } from "@/features/me";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IMeService>(TYPES.MeService).to(MeService);
container.bind<IBrandRepository>(TYPES.BrandRepository).to(BrandRepository);
container.bind<IBrandService>(TYPES.BrandService).to(BrandService);
