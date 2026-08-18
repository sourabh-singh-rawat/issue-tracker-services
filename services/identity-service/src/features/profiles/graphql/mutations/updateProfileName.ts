import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { UpdateProfileNameInput } from "@/features/profiles/graphql/inputs/UpdateProfileNameInput";
import { ProfileObject } from "@/features/profiles/graphql/objects/ProfileObject";
import type { IProfileService } from "@/features/profiles/services";
import { requireUserId } from "@/graphql/context";

builder.mutationFields((t) => ({
  updateProfileName: t.field({
    type: ProfileObject,
    args: {
      input: t.arg({ type: UpdateProfileNameInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProfileService>(TYPES.ProfileService);

      return service.updateName({
        identityId: requireUserId(ctx),
        firstName: input.firstName,
        middleName: input.middleName ?? undefined,
        lastName: input.lastName ?? undefined,
      });
    },
  }),
}));
