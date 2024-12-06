import { NotFoundError } from "@issue-tracker/common";
import { Queue } from "bullmq";
import { adminStorage } from "../../config";
import { Attachment } from "../../data";
import {
  AttachmentService,
  CreateAttachmentOptions,
  DeleteAttachmentOptions,
} from "./interfaces";

export class CoreAttachmentService implements AttachmentService {
  constructor(private readonly imageProcessingQueue: Queue) {}

  async createAttachment(options: CreateAttachmentOptions) {
    await this.imageProcessingQueue.add("process-and-upload-image", {
      ...options,
    });
  }

  async findAttachments(itemId: string) {
    const [rows, rowCount] = await Attachment.findAndCount({
      where: { itemId },
    });

    return { rows, rowCount };
  }

  async deleteAttachment(options: DeleteAttachmentOptions) {
    const { id, manager } = options;
    const AttachmentRepo = manager.getRepository(Attachment);

    const attachment = await AttachmentRepo.findOne({ where: { id } });
    if (!attachment) throw new NotFoundError("Attachment");

    await adminStorage.file(attachment.thumbnailLink).delete();
    await adminStorage.file(attachment.imageLink).delete();

    await AttachmentRepo.delete({ id });
  }
}
