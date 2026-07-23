import { NotFoundError } from "@pine/common";
import { Queue } from "bullmq";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { Attachment } from "../entities";
import { AttachmentService, CreateAttachmentOptions, DeleteAttachmentOptions } from "./interfaces";

@injectable()
export class CoreAttachmentService implements AttachmentService {
  constructor(
    @inject(TYPES.ImageProcessingQueue)
    private readonly imageProcessingQueue: Queue,
  ) {}

  async createAttachment(options: CreateAttachmentOptions) {
    await this.imageProcessingQueue.add("process-and-upload-image", {
      ...options,
    });
  }

  async findAttachments(issueId: string) {
    const [rows, rowCount] = await Attachment.findAndCount({
      where: { issueId },
    });

    return { rows, rowCount };
  }

  async deleteAttachment(options: DeleteAttachmentOptions) {
    const { id, manager } = options;
    const AttachmentRepo = manager.getRepository(Attachment);

    const attachment = await AttachmentRepo.findOne({ where: { id } });
    if (!attachment) throw new NotFoundError("Attachment");

    await AttachmentRepo.delete({ id });
  }
}
