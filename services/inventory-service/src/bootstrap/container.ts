import { NatsPublisher, type IPublisher } from "@pine/events";
import { FastifyHttpServer, type IHttpServer } from "@pine/http";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { fastifyServer } from "@/bootstrap/fastify";
import { logger } from "@/bootstrap/logger";
import { BrandRepository, BrandSyncConsumer, type IBrandRepository } from "@/features/brands";
import {
  IIdentityRepository,
  IdentityRepository,
  IdentitySyncConsumer,
} from "@/features/identities";
import { IMeService, MeService } from "@/features/me";
import {
  IProductRepository,
  IProductUnitRepository,
  ProductRepository,
  ProductSyncConsumer,
  ProductUnitRepository,
} from "@/features/products";
import { routes } from "@/routes";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind<IPublisher>(TYPES.Publisher).toConstantValue(new NatsPublisher(broker));

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).to(IdentitySyncConsumer);
container.bind<IMeService>(TYPES.MeService).to(MeService);
container.bind<IBrandRepository>(TYPES.BrandRepository).to(BrandRepository);
container.bind<BrandSyncConsumer>(TYPES.BrandSyncConsumer).to(BrandSyncConsumer);
container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<IProductUnitRepository>(TYPES.ProductUnitRepository).to(ProductUnitRepository);
container.bind<ProductSyncConsumer>(TYPES.ProductSyncConsumer).to(ProductSyncConsumer);

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  new FastifyHttpServer(fastifyServer, {
    config: {
      host: "0.0.0.0",
      port: 5002,
      environment: env.NODE_ENV,
      version: 1,
    },
    cors: { credentials: true, origin: env.ERP_WEB_URL },
    cookie: { secret: env.JWT_SECRET },
    routes,
  }),
);
