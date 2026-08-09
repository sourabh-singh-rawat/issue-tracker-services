import { NotFoundError } from "@pine/common";
import { Queue } from "bullmq";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IAttachmentRepository } from "@/features/attachment/repositories";
import { AttachmentService, CreateAttachmentOptions, DeleteAttachmentOptions } from "./interfaces";

@injectable()
export class CoreAttachmentService implements AttachmentService {
  constructor(
    @inject(TYPES.ImageProcessingQueue)
    private readonly imageProcessingQueue: Queue,
    @inject(TYPES.AttachmentRepository)
    private readonly attachmentRepository: IAttachmentRepository,
  ) {}

  async createAttachment(options: CreateAttachmentOptions) {
    await this.imageProcessingQueue.add("process-and-upload-image", {
      ...options,
    });
  }

  async findAttachments(issueId: string) {
    return this.attachmentRepository.findByIssueId(issueId);
  }

  async deleteAttachment(options: DeleteAttachmentOptions) {
    const { id, tx } = options;
    const attachment = await this.attachmentRepository.findById(id, { tx });
    if (!attachment) throw new NotFoundError("Attachment");

    await this.attachmentRepository.deleteById(id, { tx });
  }
}
