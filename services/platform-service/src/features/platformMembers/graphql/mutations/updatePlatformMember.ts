import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { UpdatePlatformMemberInput } from "@/features/platformMembers/graphql/inputs/UpdatePlatformMemberInput";
import { PlatformMemberObject } from "@/features/platformMembers/graphql/objects/PlatformMemberObject";
import type { IPlatformMemberService } from "@/features/platformMembers/services";

builder.mutationFields((t) => ({
  updatePlatformMember: t.field({
    type: PlatformMemberObject,
    args: {
      input: t.arg({ type: UpdatePlatformMemberInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IPlatformMemberService>(
        TYPES.PlatformMemberService,
      );

      return service.updatePlatformMember(
        input.id,
        {
          expiresAt: input.expiresAt ?? undefined,
          reason: input.reason ?? undefined,
        },
        input.platformId,
        ctx.user!.id,
      );
    },
  }),
}));
