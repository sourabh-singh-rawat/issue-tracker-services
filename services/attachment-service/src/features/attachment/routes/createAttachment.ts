import type { HttpRoute } from "@pine/server";
import { StatusCodes } from "http-status-codes";
import { requireAuth } from "@pine/security";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { AttachmentService } from "@/features/attachment/services";
import {
  CreateAttachmentBodySchema,
  CreateAttachmentCreatedSchema,
  CreateAttachmentErrorSchema,
  CreateAttachmentParamsSchema,
} from "@/features/attachment/schemas";

export const createAttachment: HttpRoute = {
  url: "/attachments/:issueId",
  method: "POST",
  schema: {
    tags: ["attachment"],
    summary: "Create a new issue attachment",
    description: "Create a new issue attachment",
    consumes: ["multipart/form-data"],
    operationId: "createAttachment",
    params: CreateAttachmentParamsSchema,
    body: CreateAttachmentBodySchema,
    response: {
      201: CreateAttachmentCreatedSchema,
      400: CreateAttachmentErrorSchema,
      500: CreateAttachmentErrorSchema,
    },
  },
  hooks: [requireAuth],
  handler: async (request) => {
    const issueId = request.params.issueId;
    if (issueId === undefined) {
      throw new Error("Missing issueId");
    }

    const userId = request.user?.id;
    if (userId === undefined) {
      throw new Error("Missing authenticated user");
    }

    const data = await request.file();
    if (!data) throw new Error("No data provided");

    const service = container.get<AttachmentService>(TYPES.AttachmentService);
    await service.createAttachment({
      issueId,
      userId,
      filename: data.filename,
      mimetype: data.mimetype,
      file: await data.toBuffer(),
    });

    return { status: StatusCodes.CREATED };
  },
};
