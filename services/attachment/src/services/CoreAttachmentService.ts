import { AttachmentService, CreateAttachmentOptions } from "./interfaces";
import { ServiceResponse } from "@issue-tracker/common";
import { Queue } from "bullmq";
import { Attachment } from "../data/entities";

export class CoreAttachmentService implements AttachmentService {
  constructor(private readonly imageProcessingQueue: Queue) {}

  async createAttachment(options: CreateAttachmentOptions) {
    await this.imageProcessingQueue.add("process-and-upload-image", {
      ...options,
    });
  }

  async findAttachments(id: string) {
    const [rows, rowCount] = await Attachment.findAndCount({
      where: { itemId: id },
    });

    return { rows, rowCount };
  }
}
