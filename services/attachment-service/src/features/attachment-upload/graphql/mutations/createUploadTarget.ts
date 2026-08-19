import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CreateUploadTargetInput } from "@/features/attachment-upload/graphql/inputs/CreateUploadTargetInput";
import { UploadTargetObject } from "@/features/attachment-upload/graphql/objects/UploadTargetObject";
import type { IAttachmentUploadService } from "@/features/attachment-upload/services";

builder.mutationFields((t) => ({
  createUploadTarget: t.field({
    type: UploadTargetObject,
    args: {
      input: t.arg({ type: CreateUploadTargetInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IAttachmentUploadService>(TYPES.AttachmentUploadService);

      return service.createUploadTarget({
        tenantId: input.tenantId,
        createdBy: ctx.user!.id,
        filename: input.filename,
        contentType: input.contentType,
        size: input.size,
      });
    },
  }),
}));
