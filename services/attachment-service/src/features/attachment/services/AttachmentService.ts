import { createHash } from "node:crypto";
import { NotFoundError, uuidv7 } from "@pine/common";
import { AttachmentCreatedEvent, createCloudEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { Attachment, DbClient } from "@/db";
import { ATTACHMENT_SECURITY_STATUS, ATTACHMENT_STATUS } from "@/features/attachment/constants";
import type { IAttachmentRepository } from "@/features/attachment/repositories";
import type {
  CreateAttachmentFromUploadInput,
  DeleteAttachmentOptions,
  IAttachmentService,
} from "@/features/attachment/services/IAttachmentService";

export type AttachmentDatabase = {
  transaction: <T>(callback: (tx: DbClient) => Promise<T>) => Promise<T>;
};

@injectable()
export class AttachmentService implements IAttachmentService {
  constructor(
    @inject(TYPES.Database)
    private readonly db: AttachmentDatabase,
    @inject(TYPES.AttachmentRepository)
    private readonly attachmentRepository: IAttachmentRepository,
    @inject(TYPES.OutboxService)
    private readonly outboxService: IOutboxService,
  ) {}

  async createFromUpload(input: CreateAttachmentFromUploadInput): Promise<Attachment> {
    const id = uuidv7();
    const versionId = uuidv7();
    const sha256 = createHash("sha256").update(input.data).digest("hex");

    const execute = async (tx: DbClient): Promise<Attachment> => {
      const attachment = await this.attachmentRepository.save(
        {
          id,
          scopeType: input.scopeType,
          scopeId: input.scopeId,
          tenantId: input.tenantId ?? null,
          currentVersionId: versionId,
          operationId: input.operationId,
          metadata: input.metadata,
          status: ATTACHMENT_STATUS.QUARANTINED,
          securityStatus: ATTACHMENT_SECURITY_STATUS.PENDING,
          createdBy: input.createdBy,
        },
        { tx },
      );

      await this.attachmentRepository.saveVersion(
        {
          id: versionId,
          attachmentId: id,
          versionNumber: 1,
          filename: input.filename,
          contentType: input.contentType,
          fileSize: input.data.byteLength,
          sha256,
          storageProvider: input.storageProvider,
          storageObjectKey: input.storageObjectKey,
          createdBy: input.createdBy,
        },
        { tx },
      );

      const event = createCloudEvent({
        type: AttachmentCreatedEvent.type,
        version: AttachmentCreatedEvent.version,
        schema: AttachmentCreatedEvent.schema,
        source: "pine/attachment-service",
        subject: attachment.id,
        data: {
          id: attachment.id,
          scopeType: attachment.scopeType,
          scopeId: attachment.scopeId,
          tenantId: attachment.tenantId ?? undefined,
          currentVersionId: attachment.currentVersionId ?? undefined,
          status: attachment.status,
          securityStatus: attachment.securityStatus,
          createdBy: attachment.createdBy,
          createdAt: attachment.createdAt.toISOString(),
        },
      });

      await this.outboxService.schedule(
        {
          eventId: event.id,
          eventType: event.type,
          eventVersion: AttachmentCreatedEvent.version,
          aggregateType: "attachment",
          aggregateId: attachment.id,
          payload: event,
        },
        { tx },
      );

      return attachment;
    };

    if (input.tx) {
      return execute(input.tx);
    }

    return this.db.transaction(execute);
  }

  async delete(options: DeleteAttachmentOptions): Promise<void> {
    const { id, tx } = options;
    const attachment = await this.attachmentRepository.findById(id, { tx });
    if (!attachment) {
      throw new NotFoundError("Attachment");
    }

    await this.attachmentRepository.deleteById(id, { tx });
  }
}
