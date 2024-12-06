import { QUEUE } from "@issue-tracker/common";
import { Queue } from "bullmq";
import { redisClient } from "./redisClient";

export const imageProcessingQueue = new Queue(QUEUE.IMAGE_PROCESSING, {
  connection: redisClient,
});
