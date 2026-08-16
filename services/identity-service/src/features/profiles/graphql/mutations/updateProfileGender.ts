import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { UpdateProfileGenderInput } from "@/features/profiles/graphql/inputs/UpdateProfileGenderInput";
import { ProfileObject } from "@/features/profiles/graphql/objects/ProfileObject";
import type { IProfileService } from "@/features/profiles/services";

builder.mutationFields((t) => ({
  updateProfileGender: t.field({
    type: ProfileObject,
    args: {
      input: t.arg({ type: UpdateProfileGenderInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProfileService>(TYPES.ProfileService);

      return service.updateGender({
        identityId: ctx.user!.id,
        gender: input.gender,
      });
    },
  }),
}));
