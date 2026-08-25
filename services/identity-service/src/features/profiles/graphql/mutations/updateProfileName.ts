import { UnauthorizedError } from "@pine/common";
import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { UpdateProfileNameInput } from "@/features/profiles/graphql/inputs/UpdateProfileNameInput";
import { ProfileObject } from "@/features/profiles/graphql/objects/ProfileObject";
import type { IProfileService } from "@/features/profiles/services";

builder.mutationFields((t) => ({
  updateProfileName: t.field({
    type: ProfileObject,
    authScopes: {
      identityRequired: true,
    },
    args: {
      input: t.arg({ type: UpdateProfileNameInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IProfileService>(TYPES.ProfileService);
      if (!ctx.identity) throw new UnauthorizedError();

      return service.updateName({
        identityId: ctx.identity.id,
        firstName: input.firstName,
        middleName: input.middleName ?? undefined,
        lastName: input.lastName ?? undefined,
      });
    },
  }),
}));
