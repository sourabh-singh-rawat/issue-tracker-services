import { Queue } from "bullmq";
import { redisClient } from "..";
import { ImageMetadataService } from "../queues/interfaces";

export class CoreImageMetadataService implements ImageMetadataService {
  constructor(private readonly queue: Queue) {}
}

const queue = new Queue("image-processing-queue", {
  connection: redisClient,
});
const imageProcessingQueue = new CoreImageMetadataService(queue);
