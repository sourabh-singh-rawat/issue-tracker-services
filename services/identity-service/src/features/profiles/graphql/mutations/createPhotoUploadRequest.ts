import { UnauthorizedError } from "@pine/common";
import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CreatePhotoUploadRequestInput } from "@/features/profiles/graphql/inputs/CreatePhotoUploadRequestInput";
import { PhotoUploadTargetObject } from "@/features/profiles/graphql/objects/PhotoUploadTargetObject";
import type { IProfileService } from "@/features/profiles/services";

builder.mutationFields((t) => ({
  createPhotoUploadRequest: t.field({
    type: PhotoUploadTargetObject,
    authScopes: {
      identityRequired: true,
    },
    args: {
      input: t.arg({ type: CreatePhotoUploadRequestInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProfileService>(TYPES.ProfileService);
      if (!ctx.identity) throw new UnauthorizedError();

      return service.createPhotoUploadRequest({
        identityId: ctx.identity.id,
        authMethod: ctx.identity.authMethod,
        filename: input.filename,
        contentType: input.contentType,
        size: input.size,
      });
    },
  }),
}));
