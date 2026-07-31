import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { RouteOptions } from "fastify";
import { StatusCodes } from "http-status-codes";
import { authenticate } from "@pine/identity-client";
import { requireAuth } from "@pine/security";
import { container } from "@/bootstrap";
import { TYPES } from "@/bootstrap/container-types";
import type { AttachmentService } from "@/features/attachment/services";
import {
  CreateAttachmentBodySchema,
  CreateAttachmentCreatedSchema,
  CreateAttachmentErrorSchema,
  CreateAttachmentParamsSchema,
  type CreateAttachmentParams,
} from "@/features/attachment/schemas";

export const createAttachment: RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  { Params: CreateAttachmentParams }
> = {
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
  preHandler: [authenticate, requireAuth],
  handler: async (request, reply) => {
    const { issueId } = request.params;
    const userId = request.user!.id;
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

    return reply.status(StatusCodes.CREATED).send();
  },
};
