import { uuidv7 } from "@pine/common";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IAttachmentUploadRepository } from "@/features/attachment-upload/repositories";
import type {
  CreateAttachmentUploadInput,
  IAttachmentUploadService,
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

  async create(input: CreateAttachmentUploadInput): Promise<UploadTarget> {
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

    try {
      return await this.objectStorage.createUploadTarget({
        storageObjectKey: objectKey,
        contentType: input.contentType,
        size: input.size,
        expiresAt,
      });
    } catch (error) {
      await this.attachmentUploads.markFailed(id);

      throw error;
    }
  }
}
