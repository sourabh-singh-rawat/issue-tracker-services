import { NatsPublisher, type IPublisher } from "@pine/events";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import { BrandRepository, BrandSyncConsumer, type IBrandRepository } from "@/features/brands";
import { IIdentityRepository, IdentityRepository, UserSyncConsumer } from "@/features/identities";
import { IMeService, MeService } from "@/features/me";
import {
  IProductRepository,
  IProductUnitRepository,
  ProductRepository,
  ProductSyncConsumer,
  ProductUnitRepository,
} from "@/features/products";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<UserSyncConsumer>(TYPES.UserSyncConsumer).to(UserSyncConsumer);
container.bind<IMeService>(TYPES.MeService).to(MeService);
container.bind<IBrandRepository>(TYPES.BrandRepository).to(BrandRepository);
container.bind<BrandSyncConsumer>(TYPES.BrandSyncConsumer).to(BrandSyncConsumer);
container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<IProductUnitRepository>(TYPES.ProductUnitRepository).to(ProductUnitRepository);
container.bind<ProductSyncConsumer>(TYPES.ProductSyncConsumer).to(ProductSyncConsumer);
