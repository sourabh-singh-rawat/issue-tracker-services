import { builder } from "@pine/server";
import { container, db, TYPES } from "@/bootstrap";
import type { IAttachmentService } from "@/features/attachment";

builder.mutationFields((t) => ({
  deleteAttachment: t.string({
    args: { id: t.arg.string({ required: true }) },
    resolve: async (_root, { id }) => {
      const service = container.get<IAttachmentService>(TYPES.AttachmentService);

      await db.transaction(async (tx) => {
        await service.delete({ id, tx });
      });

      return "Deleted successfully";
    },
  }),
}));
