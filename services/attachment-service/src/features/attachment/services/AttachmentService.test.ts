import { createHash } from "node:crypto";
import { NotFoundError } from "@pine/common";
import { AttachmentCreatedEvent } from "@pine/events";
import type { IOutboxService } from "@pine/outbox";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Attachment, AttachmentVersion, DbClient } from "@/db";
import { ATTACHMENT_SECURITY_STATUS, ATTACHMENT_STATUS } from "@/features/attachment/constants";
import type { IAttachmentRepository } from "@/features/attachment/repositories";
import {
  type AttachmentDatabase,
  type AttachmentQueue,
  AttachmentService,
} from "@/features/attachment/services/AttachmentService";

const toDbClient = (val: unknown): val is DbClient => true;
const dummyTx: unknown = {};
const mockTx = toDbClient(dummyTx) ? dummyTx : undefined;

describe("AttachmentService", () => {
  const imageProcessingQueue: AttachmentQueue = {
    add: vi.fn(),
  };

  const db: AttachmentDatabase = {
    transaction: vi.fn(async (callback) => {
      if (!mockTx) {
        throw new Error("mockTx not defined");
      }
      return callback(mockTx);
    }),
  };

  const attachmentRepository: IAttachmentRepository = {
    save: vi.fn(),
    saveVersion: vi.fn(),
    findById: vi.fn(),
    findByIssueId: vi.fn(),
    deleteById: vi.fn(),
  };

  const outboxService: IOutboxService = {
    schedule: vi.fn(),
    claimBatch: vi.fn(),
    complete: vi.fn(),
    failed: vi.fn(),
    get: vi.fn(),
    getByEventId: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createFromUpload", () => {
    it("creates attachment, attachment version, and schedules outbox event within a transaction", async () => {
      const savedAttachment: Attachment = {
        id: "att-123",
        tenantId: "tenant-1",
        currentVersionId: "ver-123",
        status: ATTACHMENT_STATUS.QUARANTINED,
        securityStatus: ATTACHMENT_SECURITY_STATUS.PENDING,
        createdBy: "user-1",
        createdAt: new Date(),
        updatedAt: null,
      };

      const savedVersion: AttachmentVersion = {
        id: "ver-123",
        attachmentId: "att-123",
        versionNumber: 1,
        filename: "test.png",
        contentType: "image/png",
        fileSize: 10,
        sha256: "abc",
        storageProvider: "seaweed",
        storageObjectKey: "tenant-1/att-123",
        createdBy: "user-1",
        createdAt: new Date(),
      };

      vi.mocked(attachmentRepository.save).mockResolvedValue(savedAttachment);
      vi.mocked(attachmentRepository.saveVersion).mockResolvedValue(savedVersion);

      const service = new AttachmentService(
        db,
        imageProcessingQueue,
        attachmentRepository,
        outboxService,
      );
      const data = Buffer.from("image data");
      const expectedSha256 = createHash("sha256").update(data).digest("hex");

      const result = await service.createFromUpload({
        tenantId: "tenant-1",
        filename: "test.png",
        contentType: "image/png",
        data,
        storageProvider: "seaweed",
        storageObjectKey: "tenant-1/att-123",
        createdBy: "user-1",
      });

      expect(result).toBe(savedAttachment);
      expect(attachmentRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          tenantId: "tenant-1",
          status: ATTACHMENT_STATUS.QUARANTINED,
          securityStatus: ATTACHMENT_SECURITY_STATUS.PENDING,
          createdBy: "user-1",
        }),
        expect.anything(),
      );
      expect(attachmentRepository.saveVersion).toHaveBeenCalledWith(
        expect.objectContaining({
          versionNumber: 1,
          filename: "test.png",
          contentType: "image/png",
          fileSize: data.byteLength,
          sha256: expectedSha256,
          storageProvider: "seaweed",
          storageObjectKey: "tenant-1/att-123",
          createdBy: "user-1",
        }),
        expect.anything(),
      );
      expect(outboxService.schedule).toHaveBeenCalledWith(
        expect.objectContaining({
          eventType: AttachmentCreatedEvent.type,
          eventVersion: AttachmentCreatedEvent.version,
          aggregateType: "attachment",
          aggregateId: "att-123",
          payload: expect.objectContaining({
            type: AttachmentCreatedEvent.type,
            source: "pine/attachment-service",
            subject: "att-123",
            data: {
              id: "att-123",
              tenantId: "tenant-1",
              currentVersionId: "ver-123",
              status: ATTACHMENT_STATUS.QUARANTINED,
              securityStatus: ATTACHMENT_SECURITY_STATUS.PENDING,
              createdBy: "user-1",
              createdAt: savedAttachment.createdAt.toISOString(),
            },
          }),
        }),
        expect.anything(),
      );
    });
  });

  describe("create", () => {
    it("adds image processing job to queue", async () => {
      const service = new AttachmentService(
        db,
        imageProcessingQueue,
        attachmentRepository,
        outboxService,
      );
      const options = {
        issueId: "issue-1",
        userId: "user-1",
        file: Buffer.from("data"),
        filename: "test.png",
        mimetype: "image/png",
      };

      await service.create(options);

      expect(imageProcessingQueue.add).toHaveBeenCalledWith(
        "process-and-upload-image",
        options,
      );
    });
  });

  describe("findByIssueId", () => {
    it("delegates to repository", async () => {
      const output = { rows: [], rowCount: 0 };
      vi.mocked(attachmentRepository.findByIssueId).mockResolvedValue(output);

      const service = new AttachmentService(
        db,
        imageProcessingQueue,
        attachmentRepository,
        outboxService,
      );
      const result = await service.findByIssueId("issue-1");

      expect(result).toBe(output);
      expect(attachmentRepository.findByIssueId).toHaveBeenCalledWith("issue-1");
    });
  });

  describe("delete", () => {
    it("throws NotFoundError when attachment does not exist", async () => {
      vi.mocked(attachmentRepository.findById).mockResolvedValue(null);

      const service = new AttachmentService(
        db,
        imageProcessingQueue,
        attachmentRepository,
        outboxService,
      );

      await expect(service.delete({ id: "non-existent" })).rejects.toBeInstanceOf(
        NotFoundError,
      );
    });

    it("deletes attachment when found", async () => {
      const existing: Attachment = {
        id: "att-1",
        tenantId: "tenant-1",
        currentVersionId: "ver-1",
        status: ATTACHMENT_STATUS.AVAILABLE,
        securityStatus: ATTACHMENT_SECURITY_STATUS.CLEAN,
        createdBy: "user-1",
        createdAt: new Date(),
        updatedAt: null,
      };
      vi.mocked(attachmentRepository.findById).mockResolvedValue(existing);

      const service = new AttachmentService(
        db,
        imageProcessingQueue,
        attachmentRepository,
        outboxService,
      );
      await service.delete({ id: "att-1" });

      expect(attachmentRepository.deleteById).toHaveBeenCalledWith("att-1", { tx: undefined });
    });
  });
});
