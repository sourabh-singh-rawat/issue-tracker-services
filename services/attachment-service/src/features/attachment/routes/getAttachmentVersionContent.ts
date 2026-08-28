import type { HttpRoute } from "@pine/server";
import { StatusCodes } from "http-status-codes";
import Value from "typebox/value";
import { TYPES } from "@/bootstrap/container-types";
import { GetAttachmentVersionContentParamsSchema } from "@/features/attachment/schemas";
import type { IAttachmentService } from "@/features/attachment/services";

export const getAttachmentVersionContent: HttpRoute = {
  url: "/internal/attachments/:attachmentId/versions/:versionId/content",
  method: "GET",
  schema: {
    tags: ["attachment"],
    summary: "Get attachment version content stream",
    description: "Download raw attachment version content",
    operationId: "getAttachmentVersionContent",
    params: GetAttachmentVersionContentParamsSchema,
  },
  handler: async (request) => {
    if (!Value.Check(GetAttachmentVersionContentParamsSchema, request.params)) {
      throw new Error("Invalid attachment params");
    }

    const { attachmentId, versionId } = request.params;
    const { container } = await import("@/bootstrap/container");
    const service = container.get<IAttachmentService>(TYPES.AttachmentService);
    const content = await service.getContent({ attachmentId, versionId });

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
