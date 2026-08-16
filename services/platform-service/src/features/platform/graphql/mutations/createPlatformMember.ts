import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreatePlatformMemberInput } from "@/features/platform/graphql/inputs/CreatePlatformMemberInput";
import { PlatformMemberObject } from "@/features/platform/graphql/objects/PlatformMemberObject";
import type { IPlatformMemberService } from "@/features/platform/services";

builder.mutationFields((t) => ({
  createPlatformMember: t.field({
    type: PlatformMemberObject,
    args: {
      input: t.arg({ type: CreatePlatformMemberInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IPlatformMemberService>(TYPES.PlatformMemberService);

      return service.create(
        {
          relation: input.relation,
          identityId: input.identityId,
        },
        ctx.user!.id,
      );
    },
  }),
}));
