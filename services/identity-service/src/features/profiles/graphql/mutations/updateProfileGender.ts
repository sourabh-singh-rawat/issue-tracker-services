import { UnauthorizedError } from "@pine/common";
import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { UpdateProfileGenderInput } from "@/features/profiles/graphql/inputs/UpdateProfileGenderInput";
import { ProfileObject } from "@/features/profiles/graphql/objects/ProfileObject";
import type { IProfileService } from "@/features/profiles/services";

builder.mutationFields((t) => ({
  updateProfileGender: t.field({
    type: ProfileObject,
    authScopes: {
      identityRequired: true,
    },
    args: {
      input: t.arg({ type: UpdateProfileGenderInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProfileService>(TYPES.ProfileService);
      if (!ctx.identity) throw new UnauthorizedError();

      return service.updateGender({
        identityId: ctx.identity.id,
        gender: input.gender,
      });
    },
  }),
}));
