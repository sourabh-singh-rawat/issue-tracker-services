import {
  AttachmentService,
  CreateAttachmentOptions,
} from "./interfaces/AttachmentService";
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

  getAttachmentList = async (id: string) => {
    const [rows, rowCount] = await Attachment.findAndCount({
      where: { itemId: id },
    });

    return new ServiceResponse({ rows, filteredRowCount: rowCount });
  };
}
