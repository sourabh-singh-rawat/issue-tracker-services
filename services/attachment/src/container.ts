import "./env";

import {
  AwilixDi,
  CoreLogger,
  Logger,
} from "@issue-tracker/server-core";
import { Broker, NatsBroker } from "@issue-tracker/event-bus";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { Queue } from "bullmq";
import Redis from "ioredis";
import pino from "pino";
import { DataSource } from "typeorm";
import {
  AttachmentController,
  AttachmentService,
  CoreAttachmentController,
  CoreAttachmentService,
} from "@/features/attachment";
import {
  adminStorage,
  broker,
  imageProcessingQueue,
  redisClient,
} from "@/config";

export const logger = new CoreLogger(
  pino({ transport: { target: "pino-pretty" } }),
);

export interface RegisteredServices {
  logger: Logger;
  dataSource: DataSource;
  broker: Broker;
  attachmentController: AttachmentController;
  attachmentService: AttachmentService;
  redisClient: Redis;
  imageProcessingQueue: Queue;
}

const awilix = createContainer<RegisteredServices>({
  injectionMode: InjectionMode.CLASSIC,
});

export const container = new AwilixDi<RegisteredServices>(awilix, logger);

export const dataSource = new DataSource({
  type: "postgres",
  url: process.env.ATTACHMENT_POSTGRES_CLUSTER_URL,
  entities: ["src/features/attachment/entities/*.ts"],
  synchronize: true,
});

container.add("dataSource", asValue(dataSource));
container.add("logger", asValue(logger));
container.add("broker", asValue(broker));
container.add("redisClient", asValue(redisClient));
container.add("imageProcessingQueue", asValue(imageProcessingQueue));
container.add("attachmentController", asClass(CoreAttachmentController));
container.add("attachmentService", asClass(CoreAttachmentService));

export { adminStorage, broker, imageProcessingQueue, redisClient };
