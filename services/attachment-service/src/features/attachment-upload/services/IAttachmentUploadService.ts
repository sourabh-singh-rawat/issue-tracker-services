import type { UploadTarget } from "@/integrations/storage";

export type CreateAttachmentUploadInput = {
  tenantId: string;
  createdBy: string;
  filename: string;
  contentType: string;
  size: number;
};

export interface IAttachmentUploadService {
  create: (input: CreateAttachmentUploadInput) => Promise<UploadTarget>;
}