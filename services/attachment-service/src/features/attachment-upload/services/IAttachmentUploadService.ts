import type { UploadTarget } from "@/integrations/storage";

export type CreateAttachmentUploadInput = {
  tenantId: string;
  createdBy: string;
  filename: string;
  contentType: string;
  size: number;
};

export type UploadToTargetInput = {
  target: UploadTarget;
  data: BodyInit;
};

export type ProcessUploadInput = {
  uploadId: string;
  data: Buffer | Uint8Array;
  contentType?: string;
};

export interface IAttachmentUploadService {
  createUploadTarget: (input: CreateAttachmentUploadInput) => Promise<UploadTarget>;
  uploadToTarget: (input: UploadToTargetInput) => Promise<void>;
  upload: (input: ProcessUploadInput) => Promise<void>;
}
