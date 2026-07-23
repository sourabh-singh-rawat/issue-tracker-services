import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { AttachmentService } from "@/features/attachment";
import { PaginatedFileOutput } from "../objects/PaginatedFileOutput";

builder.queryFields((t) => ({
  findFiles: t.field({
    type: PaginatedFileOutput,
    args: {
      issueId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { issueId }) => {
      const service = container.get<AttachmentService>(TYPES.AttachmentService);
      return await service.findAttachments(issueId);
    },
  }),
}));
