import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/bootstrap/env", () => ({
  env: {
    DATA_GATEWAY_URL: "http://127.0.0.1:4001",
  },
}));

import type { Attachment, AttachmentUpload } from "@/db";
import {
  ATTACHMENT_SECURITY_STATUS,
  ATTACHMENT_STATUS,
  type IAttachmentService,
} from "@/features/attachment";
import { ATTACHMENT_UPLOAD_STATUS } from "@/features/attachment-upload/constants";
import {
  AttachmentUploadAlreadyProcessedError,
  AttachmentUploadExpiredError,
  AttachmentUploadNotFoundError,
} from "@/features/attachment-upload/errors";
import type { IAttachmentUploadRepository } from "@/features/attachment-upload/repositories";
import { AttachmentUploadService } from "@/features/attachment-upload/services/AttachmentUploadService";
import type { IObjectStorage } from "@/integrations/storage";

describe("AttachmentUploadService", () => {
  const attachmentUploads: IAttachmentUploadRepository = {
    save: vi.fn(),
    findById: vi.fn(),
    markCompleted: vi.fn(),
    markFailed: vi.fn(),
  };

  const objectStorage: IObjectStorage = {
    createUploadTarget: vi.fn(),
    putObject: vi.fn(),
    createDownloadUrl: vi.fn(),
    deleteObject: vi.fn(),
    getObjectMetadata: vi.fn(),
  };

  const attachmentService: IAttachmentService = {
    createFromUpload: vi.fn(),
    delete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createUploadTarget", () => {
    it("creates a target URL on data-gateway and saves pending upload record", async () => {
      const service = new AttachmentUploadService(
        attachmentUploads,
        objectStorage,
        attachmentService,
      );
      const target = await service.createUploadTarget({
        tenantId: "01a015a6-2e8f-74da-92ce-174d8adb00d4",
        filename: "avatar.png",
        contentType: "image/png",
        size: 1024,
        createdBy: "user-1",
      });

      expect(target.url).toMatch(/^http:\/\/127\.0\.0\.1:4001\/attachments\/upload\/[0-9a-f-]+$/);
      expect(target.headers).toEqual({ "Content-Type": "image/png" });
      expect(attachmentUploads.save).toHaveBeenCalled();
    });
  });

  describe("uploadToTarget", () => {
    it("puts object to storage, creates attachment/version via attachmentService, and marks upload as completed", async () => {
      const record: AttachmentUpload = {
        id: "upload-1",
        tenantId: "tenant-1",
        operationId: null,
        metadata: null,
        status: ATTACHMENT_UPLOAD_STATUS.PENDING,
        filename: "photo.png",
        contentType: "image/png",
        expectedSize: 1024,
        storageProvider: "seaweed",
        storageObjectKey: "tenant-1/upload-1",
        expiresAt: new Date(Date.now() + 60_000),
        createdBy: "user-1",
        createdAt: new Date(),
        completedAt: null,
      };
      vi.mocked(attachmentUploads.findById).mockResolvedValue(record);

      const createdAttachment: Attachment = {
        id: "att-1",
        tenantId: "tenant-1",
        currentVersionId: "ver-1",
        operationId: null,
        metadata: null,
        status: ATTACHMENT_STATUS.QUARANTINED,
        securityStatus: ATTACHMENT_SECURITY_STATUS.PENDING,
        createdBy: "user-1",
        createdAt: new Date(),
        updatedAt: null,
      };
      vi.mocked(attachmentService.createFromUpload).mockResolvedValue(createdAttachment);

      const service = new AttachmentUploadService(
        attachmentUploads,
        objectStorage,
        attachmentService,
      );
      const data = Buffer.from("test payload");
      await service.uploadToTarget({ uploadId: "upload-1", data, contentType: "image/png" });

      expect(objectStorage.putObject).toHaveBeenCalledWith({
        storageObjectKey: "tenant-1/upload-1",
        contentType: "image/png",
        body: data,
        contentLength: data.byteLength,
      });
      expect(attachmentService.createFromUpload).toHaveBeenCalledWith({
        tenantId: "tenant-1",
        filename: "photo.png",
        contentType: "image/png",
        data,
        storageProvider: "seaweed",
        storageObjectKey: "tenant-1/upload-1",
        createdBy: "user-1",
      });
      expect(attachmentUploads.markCompleted).toHaveBeenCalledWith("upload-1");
    });

    it("throws AttachmentUploadNotFoundError when record is not found", async () => {
      vi.mocked(attachmentUploads.findById).mockResolvedValue(null);

      const service = new AttachmentUploadService(
        attachmentUploads,
        objectStorage,
        attachmentService,
      );
      const data = Buffer.from("test payload");

      await expect(
        service.uploadToTarget({ uploadId: "missing-upload", data, contentType: "image/png" }),
      ).rejects.toBeInstanceOf(AttachmentUploadNotFoundError);
    });

    it("throws AttachmentUploadAlreadyProcessedError when status is not PENDING", async () => {
      const record: AttachmentUpload = {
        id: "upload-1",
        tenantId: "tenant-1",
        operationId: null,
        metadata: null,
        status: ATTACHMENT_UPLOAD_STATUS.COMPLETED,
        filename: "photo.png",
        contentType: "image/png",
        expectedSize: 1024,
        storageProvider: "seaweed",
        storageObjectKey: "tenant-1/upload-1",
        expiresAt: new Date(Date.now() + 60_000),
        createdBy: "user-1",
        createdAt: new Date(),
        completedAt: new Date(),
      };
      vi.mocked(attachmentUploads.findById).mockResolvedValue(record);

      const service = new AttachmentUploadService(
        attachmentUploads,
        objectStorage,
        attachmentService,
      );
      const data = Buffer.from("test payload");

      await expect(
        service.uploadToTarget({ uploadId: "upload-1", data, contentType: "image/png" }),
      ).rejects.toBeInstanceOf(AttachmentUploadAlreadyProcessedError);
    });

    it("marks upload as failed and throws AttachmentUploadExpiredError when expired", async () => {
      const record: AttachmentUpload = {
        id: "upload-1",
        tenantId: "tenant-1",
        operationId: null,
        metadata: null,
        status: ATTACHMENT_UPLOAD_STATUS.PENDING,
        filename: "photo.png",
        contentType: "image/png",
        expectedSize: 1024,
        storageProvider: "seaweed",
        storageObjectKey: "tenant-1/upload-1",
        expiresAt: new Date(Date.now() - 60_000),
        createdBy: "user-1",
        createdAt: new Date(),
        completedAt: null,
      };
      vi.mocked(attachmentUploads.findById).mockResolvedValue(record);

      const service = new AttachmentUploadService(
        attachmentUploads,
        objectStorage,
        attachmentService,
      );
      const data = Buffer.from("test payload");

      await expect(
        service.uploadToTarget({ uploadId: "upload-1", data, contentType: "image/png" }),
      ).rejects.toBeInstanceOf(AttachmentUploadExpiredError);

      expect(attachmentUploads.markFailed).toHaveBeenCalledWith("upload-1");
    });

    it("marks upload as failed if storage or attachment creation throws", async () => {
      const record: AttachmentUpload = {
        id: "upload-1",
        tenantId: "tenant-1",
        operationId: null,
        metadata: null,
        status: ATTACHMENT_UPLOAD_STATUS.PENDING,
        filename: "photo.png",
        contentType: "image/png",
        expectedSize: 1024,
        storageProvider: "seaweed",
        storageObjectKey: "tenant-1/upload-1",
        expiresAt: new Date(Date.now() + 60_000),
        createdBy: "user-1",
        createdAt: new Date(),
        completedAt: null,
      };
      vi.mocked(attachmentUploads.findById).mockResolvedValue(record);
      vi.mocked(attachmentService.createFromUpload).mockRejectedValue(
        new Error("Database insert failure"),
      );

      const service = new AttachmentUploadService(
        attachmentUploads,
        objectStorage,
        attachmentService,
      );
      const data = Buffer.from("test payload");

      await expect(
        service.uploadToTarget({ uploadId: "upload-1", data, contentType: "image/png" }),
      ).rejects.toThrow("Database insert failure");

      expect(attachmentUploads.markFailed).toHaveBeenCalledWith("upload-1");
    });
  });
});
