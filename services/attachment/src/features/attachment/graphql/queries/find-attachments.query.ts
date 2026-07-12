import { builder } from "@issue-tracker/graphql-core";
import { container } from "@/container";
import { PaginatedAttachment } from "../objects/paginated-attachment.object";

builder.queryFields((t) => ({
  findAttachments: t.field({
    type: PaginatedAttachment,
    args: {
      issueId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { issueId }) => {
      const service = container.get("attachmentService");
      return await service.findAttachments(issueId);
    },
  }),
}));
