import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import type { IAttachmentService } from "@/features/attachment";
import { PaginatedFileOutput } from "../objects/PaginatedFileOutput";

builder.queryFields((t) => ({
  findFiles: t.field({
    type: PaginatedFileOutput,
    args: {
      issueId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { issueId }) => {
      const service = container.get<IAttachmentService>(TYPES.AttachmentService);
      return await service.findByIssueId(issueId);
    },
  }),
}));
