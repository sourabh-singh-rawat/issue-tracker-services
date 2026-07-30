import { Container } from "inversify";
import { broker } from "@/bootstrap/broker";
import { TYPES } from "@/bootstrap/container-types";
import { dataSource } from "@/bootstrap/data-source";
import { logger } from "@/bootstrap/logger";
import { imageProcessingQueue } from "@/bootstrap/queue";
import { redisClient } from "@/bootstrap/redis-client";
import { AttachmentService, CoreAttachmentService } from "@/features/attachment";
import { UserSyncConsumer } from "@/features/user";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(TYPES.DataSource).toConstantValue(dataSource);
container.bind(TYPES.Logger).toConstantValue(logger);
container.bind(TYPES.Broker).toConstantValue(broker);
container.bind(TYPES.RedisClient).toConstantValue(redisClient);
container.bind(TYPES.ImageProcessingQueue).toConstantValue(imageProcessingQueue);

container.bind<AttachmentService>(TYPES.AttachmentService).to(CoreAttachmentService);
container.bind<UserSyncConsumer>(TYPES.UserSyncConsumer).to(UserSyncConsumer);
