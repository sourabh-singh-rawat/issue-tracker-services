import { QUEUE, uuidv7 } from "@pine/common";
import { Worker } from "bullmq";
import sharp from "sharp";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { logger } from "@/bootstrap/logger";
import { redisClient } from "@/bootstrap/redis-client";
import { ATTACHMENT_STATUS, type IAttachmentRepository } from "@/features/attachment";

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
        tenantId: userId,
        status: ATTACHMENT_STATUS.UPLOADING,
        securityStatus: "pending",
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
