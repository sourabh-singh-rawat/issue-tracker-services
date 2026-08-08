import { QUEUE, uuidv7 } from "@pine/common";
import { Worker } from "bullmq";
import sharp from "sharp";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { logger } from "@/bootstrap/logger";
import { redisClient } from "@/bootstrap/redis-client";
import type { IAttachmentRepository } from "@/features/attachment";

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
      const { issueId, userId, file, filename: originalFilename, mimetype } = data;
      const sharpedFile = sharp(file);
      const contentType = mimetype;
      const sizes = { small: { width: 250 }, large: { width: 1200 } };
      await sharpedFile.resize(sizes.small.width).toBuffer();
      await sharpedFile.resize(sizes.large.width).toBuffer();
      const filename = uuidv7();
      const thumbnailLink = `attachments/${issueId}/${filename}-small`;
      const imageLink = `attachments/${issueId}/${filename}-large`;

      const attachmentRepository = container.get<IAttachmentRepository>(TYPES.AttachmentRepository);

      await attachmentRepository.save({
        id: uuidv7(),
        issueId,
        ownerId: userId,
        contentType,
        thumbnailLink,
        imageLink,
        bucket: "",
        filename,
        originalFilename,
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
