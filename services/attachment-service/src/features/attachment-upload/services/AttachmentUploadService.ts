import { NotFoundError, uuidv7 } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { env } from "@/bootstrap/env";
import type { IAttachmentUploadRepository } from "@/features/attachment-upload/repositories";
import type {
  CreateAttachmentUploadInput,
  IAttachmentUploadService,
  ProcessUploadInput,
  UploadToTargetInput,
} from "@/features/attachment-upload/services/IAttachmentUploadService";
import type { IObjectStorage, UploadTarget } from "@/integrations/storage";

@injectable()
export class AttachmentUploadService implements IAttachmentUploadService {
  constructor(
    @inject(TYPES.AttachmentUploadRepository)
    private readonly attachmentUploads: IAttachmentUploadRepository,
    @inject(TYPES.ObjectStorage)
    private readonly objectStorage: IObjectStorage,
  ) {}

  async createUploadTarget(input: CreateAttachmentUploadInput): Promise<UploadTarget> {
    const id = uuidv7();
    const objectKey = `${input.tenantId}/${id}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.attachmentUploads.save({
      id,
      tenantId: input.tenantId,
      status: "PENDING",
      filename: input.filename,
      contentType: input.contentType,
      expectedSize: input.size,
      storageProvider: "seaweed",
      storageObjectKey: objectKey,
      expiresAt,
      createdBy: input.createdBy,
    });

    const url = new URL(`/attachments/upload/${id}`, env.DATA_GATEWAY_URL).toString();

    return {
      objectId: objectKey,
      url,
      headers: {
        "Content-Type": input.contentType,
      },
      expiresAt,
    };
  }

  async uploadToTarget(input: UploadToTargetInput): Promise<void> {
    const response = await fetch(input.target.url, {
      method: "PUT",
      headers: input.target.headers,
      body: input.data,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload to target: ${response.status} ${response.statusText}`);
    }
  }

  async upload(input: ProcessUploadInput): Promise<void> {
    const record = await this.attachmentUploads.findById(input.uploadId);
    if (!record) {
      throw new NotFoundError("AttachmentUpload");
    }

    if (record.status !== "PENDING") {
      throw new Error(`Upload is already ${record.status.toLowerCase()}`);
    }

    if (record.expiresAt < new Date()) {
      await this.attachmentUploads.markFailed(record.id);
      throw new Error("Upload has expired");
    }

    try {
      await this.objectStorage.putObject({
        storageObjectKey: record.storageObjectKey,
        contentType: input.contentType ?? record.contentType,
        body: input.data,
        contentLength: input.data.byteLength,
      });

      await this.attachmentUploads.markCompleted(record.id);
    } catch (error) {
      await this.attachmentUploads.markFailed(record.id);
      throw error;
    }
  }
}
