import { NatsPublisher, type IPublisher } from "@pine/events";
import {
  ExponentialBackoffPolicy,
  OutboxCleanupService,
  OutboxCleanupWorker,
  OutboxRepository,
  OutboxService,
  OutboxWorker,
  type IOutboxCleanupService,
  type IOutboxCleanupWorker,
  type IOutboxPublisher,
  type IOutboxRepository,
  type IOutboxService,
  type IOutboxWorker,
  type IRetryPolicy,
} from "@pine/outbox";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { logger } from "@/bootstrap/logger";
import { BrandRepository, type IBrandRepository, BrandService, type IBrandService } from "@/features/brands";
import {
  CategoryRepository,
  type ICategoryRepository,
  CategoryService,
  type ICategoryService,
} from "@/features/categories";
import { IIdentityRepository, IdentityRepository, UserSyncConsumer } from "@/features/identities";
import { IMeService, MeService } from "@/features/me";
import {
  ProductRepository,
  type IProductRepository,
  ProductUnitRepository,
  type IProductUnitRepository,
  ProductService,
  type IProductService,
} from "@/features/products";
import { UnitRepository, type IUnitRepository, UnitService, type IUnitService } from "@/features/units";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));
container.bind<IOutboxRepository>(TYPES.OutboxRepository).toConstantValue(new OutboxRepository(db));
container.bind<IRetryPolicy>(TYPES.RetryPolicy).toConstantValue(new ExponentialBackoffPolicy());
container
  .bind<IOutboxService>(TYPES.OutboxService)
  .toConstantValue(new OutboxService(container.get<IOutboxRepository>(TYPES.OutboxRepository), container.get<IRetryPolicy>(TYPES.RetryPolicy)));
container
  .bind<IOutboxWorker>(TYPES.OutboxWorker)
  .toConstantValue(new OutboxWorker(container.get<IOutboxService>(TYPES.OutboxService), container.get<IPublisher>(TYPES.Publisher) as IOutboxPublisher));
container
  .bind<IOutboxCleanupService>(TYPES.OutboxCleanupService)
  .toConstantValue(new OutboxCleanupService(container.get<IOutboxRepository>(TYPES.OutboxRepository)));
container
  .bind<IOutboxCleanupWorker>(TYPES.OutboxCleanupWorker)
  .toConstantValue(new OutboxCleanupWorker(container.get<IOutboxCleanupService>(TYPES.OutboxCleanupService)));

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<UserSyncConsumer>(TYPES.UserSyncConsumer).to(UserSyncConsumer);
container.bind<IMeService>(TYPES.MeService).to(MeService);
container.bind<IBrandRepository>(TYPES.BrandRepository).to(BrandRepository);
container.bind<IBrandService>(TYPES.BrandService).to(BrandService);
container.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository);
container.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService);
container.bind<IUnitRepository>(TYPES.UnitRepository).to(UnitRepository);
container.bind<IUnitService>(TYPES.UnitService).to(UnitService);
container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<IProductUnitRepository>(TYPES.ProductUnitRepository).to(ProductUnitRepository);
container.bind<IProductService>(TYPES.ProductService).to(ProductService);
