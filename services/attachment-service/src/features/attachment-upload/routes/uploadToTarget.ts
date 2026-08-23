import type { HttpRoute } from "@pine/server";
import { StatusCodes } from "http-status-codes";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import { ATTACHMENT_UPLOAD_STATUS } from "@/features/attachment-upload/constants";
import {
  UploadAttachmentParamsSchema,
  UploadAttachmentResponseSchema,
} from "@/features/attachment-upload/schemas";
import type { IAttachmentUploadService } from "@/features/attachment-upload/services";

export const uploadToTarget: HttpRoute = {
  url: "/attachments/upload/:id",
  method: "PUT",
  schema: {
    tags: ["attachment"],
    summary: "Upload file to upload target",
    description: "Upload file to upload target",
    operationId: "uploadToTarget",
    params: UploadAttachmentParamsSchema,
    response: {
      200: UploadAttachmentResponseSchema,
    },
  },
  handler: async (request) => {
    const id = request.params.id;
    if (id === undefined) {
      throw new Error("Missing upload id");
    }

    let buffer: Buffer | undefined;
    let contentType = request.headers["content-type"];

    if (request.isMultipart()) {
      const file = await request.file();
      if (file) {
        buffer = await file.toBuffer();
        contentType = file.mimetype;
      }
    } else if (Buffer.isBuffer(request.body)) {
      buffer = request.body;
    } else if (request.body instanceof Uint8Array) {
      buffer = Buffer.from(request.body);
    }

    if (!buffer) {
      throw new Error("No upload data provided");
    }

    const service = container.get<IAttachmentUploadService>(TYPES.AttachmentUploadService);
    await service.uploadToTarget({
      uploadId: id,
      data: buffer,
      contentType,
    });

    return {
      status: StatusCodes.OK,
      body: { status: ATTACHMENT_UPLOAD_STATUS.COMPLETED },
    };
  },
};
