import { NatsPublisher, type IPublisher } from "@pine/events";
import { resolveIdentityFromHeaders } from "@pine/identity";
import { createGraphQLServer, createHttpServer, readTlsFile, type IHttpServer } from "@pine/server";
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
import path from "node:path";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { logger } from "@/bootstrap/logger";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";
import { BrandRepository, type IBrandRepository, BrandService, type IBrandService } from "@/features/brands";
import { CategoryRepository, type ICategoryRepository, CategoryService, type ICategoryService } from "@/features/categories";
import { IIdentityRepository, IdentityRepository, ProductIdentitySyncConsumer } from "@/features/identities";
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
import { routes } from "@/routes";

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
container.bind<ProductIdentitySyncConsumer>(TYPES.ProductIdentitySyncConsumer).to(ProductIdentitySyncConsumer);
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

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  createHttpServer({
    config: {
      host: "0.0.0.0",
      port: 5004,
      environment: env.NODE_ENV,
      version: 1,
    },
    https: {
      key: readTlsFile(env.PRODUCT_SERVICE_TLS_KEY_PATH),
      cert: readTlsFile(env.PRODUCT_SERVICE_TLS_CERT_PATH),
    },
    cookie: { secret: env.JWT_SECRET },
    openapi: {
      info: {
        title: "Product Service",
        version: "0.0.0",
        description: "Product APIs",
        license: { name: "ISC", url: "https://opensource.org/license/isc-license-txt" },
      },
      servers: [{ url: env.PRODUCT_SERVICE_URL }],
      tags: [{ name: "auth", description: "Authentication related end-points" }],
    },
    hooks: {
      onRequest: [resolveIdentityFromHeaders],
    },
    graphql: createGraphQLServer({
      schema,
      context: createContext,
    }),
    routes,
  }),
);

export const openApiOutputPath = path.join(process.cwd(), "dist", "openapi.json");

