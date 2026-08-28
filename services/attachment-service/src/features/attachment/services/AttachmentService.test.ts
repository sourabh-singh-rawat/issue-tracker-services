import { createHash } from "node:crypto";
import { NotFoundError } from "@pine/common";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Attachment, AttachmentVersion, DbClient } from "@/db";
import {
  ATTACHMENT_SCOPE_TYPE,
  ATTACHMENT_SECURITY_STATUS,
  ATTACHMENT_STATUS,
} from "@/features/attachment/constants";
import type { IAttachmentRepository } from "@/features/attachment/repositories";
import {
  type AttachmentDatabase,
  AttachmentService,
} from "@/features/attachment/services/AttachmentService";

const toDbClient = (_val: unknown): _val is DbClient => true;
const dummyTx: unknown = {};
const mockTx = toDbClient(dummyTx) ? dummyTx : undefined;

describe("AttachmentService", () => {
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
    deleteById: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createFromUpload", () => {
    it("creates attachment and attachment version within a transaction", async () => {
      const savedAttachment: Attachment = {
        id: "att-123",
        scopeType: ATTACHMENT_SCOPE_TYPE.ORGANIZATION,
        scopeId: "org-1",
        tenantId: "tenant-1",
        currentVersionId: "ver-123",
        operationId: null,
        metadata: null,
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
        storageObjectKey: "organization/org-1/att-123",
        createdBy: "user-1",
        createdAt: new Date(),
      };

      vi.mocked(attachmentRepository.save).mockResolvedValue(savedAttachment);
      vi.mocked(attachmentRepository.saveVersion).mockResolvedValue(savedVersion);

      const service = new AttachmentService(db, attachmentRepository);
      const data = Buffer.from("image data");
      const expectedSha256 = createHash("sha256").update(data).digest("hex");

      const result = await service.createFromUpload({
        scopeType: ATTACHMENT_SCOPE_TYPE.ORGANIZATION,
        scopeId: "org-1",
        tenantId: "tenant-1",
        filename: "test.png",
        contentType: "image/png",
        data,
        storageProvider: "seaweed",
        storageObjectKey: "organization/org-1/att-123",
        createdBy: "user-1",
      });

      expect(result).toBe(savedAttachment);
      expect(attachmentRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          scopeType: ATTACHMENT_SCOPE_TYPE.ORGANIZATION,
          scopeId: "org-1",
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
          storageObjectKey: "organization/org-1/att-123",
          createdBy: "user-1",
        }),
        expect.anything(),
      );
    });
  });

  describe("delete", () => {
    it("throws NotFoundError when attachment does not exist", async () => {
      vi.mocked(attachmentRepository.findById).mockResolvedValue(null);

      const service = new AttachmentService(db, attachmentRepository);

      await expect(service.delete({ id: "non-existent" })).rejects.toBeInstanceOf(
        NotFoundError,
      );
    });

    it("deletes attachment when found", async () => {
      const existing: Attachment = {
        id: "att-1",
        scopeType: ATTACHMENT_SCOPE_TYPE.ORGANIZATION,
        scopeId: "org-1",
        tenantId: "tenant-1",
        currentVersionId: "ver-1",
        operationId: null,
        metadata: null,
        status: ATTACHMENT_STATUS.AVAILABLE,
        securityStatus: ATTACHMENT_SECURITY_STATUS.CLEAN,
        createdBy: "user-1",
        createdAt: new Date(),
        updatedAt: null,
      };
      vi.mocked(attachmentRepository.findById).mockResolvedValue(existing);

      const service = new AttachmentService(db, attachmentRepository);
      await service.delete({ id: "att-1" });

      expect(attachmentRepository.deleteById).toHaveBeenCalledWith("att-1", { tx: undefined });
    });
  });
});
