import { MultipartFile } from "@fastify/multipart";
import { Attachment } from "../../data/entities";
import { ServiceResponse } from "@issue-tracker/common";

export interface CreateAttachmentOptions {
  itemId: string;
  userId: string;
  file: MultipartFile;
}

export interface AttachmentService {
  createAttachment(options: CreateAttachmentOptions): Promise<void>;
  getAttachmentList(id: string): Promise<ServiceResponse<Attachment[]>>;
}
