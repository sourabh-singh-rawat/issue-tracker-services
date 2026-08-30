import { QUEUE, uuidv7 } from "@pine/common";
import { Worker } from "bullmq";
import sharp from "sharp";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { logger } from "@/bootstrap/logger";
import { redisClient } from "@/bootstrap/redis-client";
import {
  ATTACHMENT_SCOPE_TYPE,
  ATTACHMENT_SECURITY_STATUS,
  ATTACHMENT_STATUS,
  type IAttachmentRepository,
} from "@/features/attachment";

interface ImageProcessingWorkerData {
  issueId: string;
  userId: string;
  file: Buffer;
  filename: string;
  mimetype: string;
}

export const startImageWorker = (): void => {
  const imageProcessingWorker = new Worker<ImageProcessingWorkerData>(
    QUEUE.IMAGE_PROCESSING,
    async ({ data }) => {
      const { userId, file } = data;
      const sharpedFile = sharp(file);
      const sizes = { small: { width: 250 }, large: { width: 1200 } };
      await sharpedFile.resize(sizes.small.width).toBuffer();
      await sharpedFile.resize(sizes.large.width).toBuffer();

      const attachmentRepository = container.get<IAttachmentRepository>(TYPES.AttachmentRepository);

      await attachmentRepository.save({
        id: uuidv7(),
        scopeType: ATTACHMENT_SCOPE_TYPE.IDENTITY,
        scopeId: userId,
        status: ATTACHMENT_STATUS.QUARANTINED,
        securityStatus: ATTACHMENT_SECURITY_STATUS.PENDING,
        createdBy: userId,
      });
    },
    { connection: redisClient },
  );

  imageProcessingWorker.on("ready", () => {
    logger.info("Image processing worker is ready");
  });
  imageProcessingWorker.on("completed", () => {
    logger.info("Image processed successfully");
  });
  imageProcessingWorker.on("failed", (error) => {
    logger.info(String(error));
    logger.info("Failed to process image");
  });
};
