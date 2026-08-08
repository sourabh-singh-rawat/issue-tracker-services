import { FastifyHttpServer, type IHttpServer } from "@pine/http";
import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { fastifyServer } from "@/bootstrap/fastify";
import { logger } from "@/bootstrap/logger";
import { imageProcessingQueue } from "@/bootstrap/queue";
import { redisClient } from "@/bootstrap/redis-client";
import { AttachmentRepository, AttachmentService, CoreAttachmentService, IAttachmentRepository } from "@/features/attachment";
import { IdentitySyncConsumer, IIdentityRepository, IdentityRepository } from "@/features/identities";
import { routes } from "@/routes";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.Database).toConstantValue(db);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind(TYPES.RedisClient).toConstantValue(redisClient);
container.bind(TYPES.ImageProcessingQueue).toConstantValue(imageProcessingQueue);

container.bind<IIdentityRepository>(TYPES.IdentityRepository).to(IdentityRepository);
container.bind<IAttachmentRepository>(TYPES.AttachmentRepository).to(AttachmentRepository);
container.bind<AttachmentService>(TYPES.AttachmentService).to(CoreAttachmentService);
container.bind<IdentitySyncConsumer>(TYPES.IdentitySyncConsumer).to(IdentitySyncConsumer);

container.bind<IHttpServer>(TYPES.HttpServer).toConstantValue(
  new FastifyHttpServer(fastifyServer, {
    config: {
      host: "0.0.0.0",
      port: 5003,
      environment: env.NODE_ENV,
      version: 1,
    },
    cors: {
      credentials: true,
      origin: env.ERP_WEB_URL,
    },
    cookie: { secret: env.JWT_SECRET },
    routes,
  }),
);
