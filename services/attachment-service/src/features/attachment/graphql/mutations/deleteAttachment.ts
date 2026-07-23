import { builder } from "@pine/graphql-core";
import { container, dataSource, TYPES } from "@/bootstrap";
import type { AttachmentService } from "@/features/attachment";

builder.mutationFields((t) => ({
  deleteAttachment: t.string({
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_root, { id }) => {
      const service = container.get<AttachmentService>(TYPES.AttachmentService);

      await dataSource.transaction(async (manager) => {
        await service.deleteAttachment({ id, manager });
      });

      return "Deleted successfully";
    },
  }),
}));
