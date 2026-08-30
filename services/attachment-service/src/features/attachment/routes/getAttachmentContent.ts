import { NotFoundError } from "@pine/common";
import type { HttpRoute } from "@pine/server";
import { StatusCodes } from "http-status-codes";
import Value from "typebox/value";
import { TYPES } from "@/bootstrap/container-types";
import { GetAttachmentContentParamsSchema } from "@/features/attachment/schemas";
import type { IAttachmentRepository } from "@/features/attachment/repositories";
import type { IAttachmentService } from "@/features/attachment/services";

export const getAttachmentContent: HttpRoute = {
  url: "/attachments/:attachmentId",
  method: "GET",
  schema: {
    tags: ["attachment"],
    summary: "Get attachment content stream",
    description: "Download raw current version content for an attachment",
    operationId: "getAttachmentContent",
    params: GetAttachmentContentParamsSchema,
  },
  handler: async (request) => {
    if (!Value.Check(GetAttachmentContentParamsSchema, request.params)) {
      throw new Error("Invalid attachment params");
    }

    const { attachmentId } = request.params;
    const { container } = await import("@/bootstrap/container");
    const repository = container.get<IAttachmentRepository>(TYPES.AttachmentRepository);
    const attachment = await repository.findById(attachmentId);

    if (!attachment || !attachment.currentVersionId) {
      throw new NotFoundError("Attachment");
    }

    const service = container.get<IAttachmentService>(TYPES.AttachmentService);
    const content = await service.getContent({
      attachmentId,
      versionId: attachment.currentVersionId,
    });

    return {
      status: StatusCodes.OK,
      headers: {
        "content-type": content.contentType,
        "content-length": content.fileSize.toString(),
        "content-disposition": `inline; filename="${encodeURIComponent(content.filename)}"`,
      },
      body: content.stream,
    };
  },
};
