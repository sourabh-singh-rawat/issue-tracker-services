import { Broker } from "@issue-tracker/event-bus";
import { Typeorm } from "@issue-tracker/orm";
import { AppLogger, AwilixDi, logger } from "@issue-tracker/server-core";
import { InjectionMode, asClass, asValue, createContainer } from "awilix";
import { Queue } from "bullmq";
import Redis from "ioredis";
import { DataSource } from "typeorm";
import { AttachmentController, CoreAttachmentController } from "../api";
import { AttachmentService, CoreAttachmentService } from "../app";
import { broker } from "./broker";
import { dataSource } from "./dataSource";
import { imageProcessingQueue } from "./queue";
import { redisClient } from "./redisClient";

export interface RegisteredServices {
  logger: AppLogger;
  dataSource: DataSource;
  broker: Broker;
  orm: Typeorm;
  attachmentController: AttachmentController;
  attachmentService: AttachmentService;
  redisClient: Redis;
  imageProcessingQueue: Queue;
}

const awilix = createContainer({ injectionMode: InjectionMode.CLASSIC });
export const container = new AwilixDi<RegisteredServices>(awilix, logger);
container.add("logger", asValue(logger));
container.add("dataSource", asValue(dataSource));
container.add("redisClient", asValue(redisClient));
container.add("eventBus", asValue(broker));
container.add("imageProcessingQueue", asValue(imageProcessingQueue));
container.add("attachmentController", asClass(CoreAttachmentController));
container.add("attachmentService", asClass(CoreAttachmentService));
