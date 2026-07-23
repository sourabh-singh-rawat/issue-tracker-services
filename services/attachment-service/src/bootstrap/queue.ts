import { QUEUE } from "@pine/common";
import { Queue } from "bullmq";
import { redisClient } from "./redis-client";

export const imageProcessingQueue = new Queue(QUEUE.IMAGE_PROCESSING, {
  connection: redisClient,
});
