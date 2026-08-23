import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/bootstrap/env", () => ({
  env: {
    DATA_GATEWAY_URL: "http://127.0.0.1:4001",
  },
}));

import type { AttachmentUpload } from "@/db";
import { ATTACHMENT_UPLOAD_STATUS } from "@/features/attachment-upload/constants";
import type { IAttachmentUploadRepository } from "@/features/attachment-upload/repositories";
import { AttachmentUploadService } from "@/features/attachment-upload/services/AttachmentUploadService";
import type { IObjectStorage, UploadTarget } from "@/integrations/storage";

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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createUploadTarget", () => {
    it("creates a target URL on data-gateway and saves pending upload record", async () => {
      const service = new AttachmentUploadService(attachmentUploads, objectStorage);
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
    const originalFetch = globalThis.fetch;

    afterEach(() => {
      globalThis.fetch = originalFetch;
    });

    it("puts the data to the target url with provided headers", async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        statusText: "OK",
      });
      globalThis.fetch = fetchMock;

      const service = new AttachmentUploadService(attachmentUploads, objectStorage);
      const target: UploadTarget = {
        objectId: "tenant-1/file-1",
        url: "http://127.0.0.1:4001/attachments/upload/upload-1",
        headers: {
          "Content-Type": "image/png",
        },
        expiresAt: new Date(),
      };

      const data = Buffer.from("test image data");
      await service.uploadToTarget({ target, data });

      expect(fetchMock).toHaveBeenCalledWith(target.url, {
        method: "PUT",
        headers: target.headers,
        body: data,
      });
    });

    it("throws an error when target upload fails", async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });
      globalThis.fetch = fetchMock;

      const service = new AttachmentUploadService(attachmentUploads, objectStorage);
      const target: UploadTarget = {
        objectId: "tenant-1/file-1",
        url: "http://127.0.0.1:4001/attachments/upload/upload-1",
        headers: {
          "Content-Type": "image/png",
        },
        expiresAt: new Date(),
      };

      const data = Buffer.from("test data");
      await expect(service.uploadToTarget({ target, data })).rejects.toThrow(
        "Failed to upload to target: 500 Internal Server Error",
      );
    });
  });

  describe("upload", () => {
    it("puts object to storage and marks upload as completed", async () => {
      const record: AttachmentUpload = {
        id: "upload-1",
        tenantId: "tenant-1",
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

      const service = new AttachmentUploadService(attachmentUploads, objectStorage);
      const data = Buffer.from("test payload");
      await service.upload({ uploadId: "upload-1", data, contentType: "image/png" });

      expect(objectStorage.putObject).toHaveBeenCalledWith({
        storageObjectKey: "tenant-1/upload-1",
        contentType: "image/png",
        body: data,
        contentLength: data.byteLength,
      });
      expect(attachmentUploads.markCompleted).toHaveBeenCalledWith("upload-1");
    });
  });
});
