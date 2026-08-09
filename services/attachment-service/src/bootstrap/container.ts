import { createGraphQLServer, createHttpServer, type IHttpServer } from "@pine/server";
import { Container } from "inversify";
import path from "node:path";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { db } from "@/bootstrap/db";
import { env } from "@/bootstrap/env";
import { logger } from "@/bootstrap/logger";
import { imageProcessingQueue } from "@/bootstrap/queue";
import { redisClient } from "@/bootstrap/redis-client";
import { AttachmentRepository, AttachmentService, CoreAttachmentService, IAttachmentRepository } from "@/features/attachment";
import { IdentitySyncConsumer, IIdentityRepository, IdentityRepository } from "@/features/identities";
import { createContext } from "@/graphql";
import { schema } from "@/graphql/schema";
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
  createHttpServer({
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
    multipart: { fileSize: 32000000 },
    openapi: {
      info: {
        title: "Attachment Service",
        version: "0.0.1",
        license: {
          name: "ISC",
          url: "https://opensource.org/license/isc-license-txt",
        },
      },
      servers: [{ url: env.ATTACHMENT_SERVICE_URL }],
      tags: [{ name: "attachment", description: "Attachment related end-points" }],
    },
    graphql: createGraphQLServer({
      schema,
      context: createContext,
    }),
    routes,
  }),
);

export const openApiOutputPath = path.join(process.cwd(), "dist", "openapi.json");

