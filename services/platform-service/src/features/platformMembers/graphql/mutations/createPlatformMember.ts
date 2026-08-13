import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreatePlatformMemberInput } from "@/features/platformMembers/graphql/inputs/CreatePlatformMemberInput";
import { PlatformMemberObject } from "@/features/platformMembers/graphql/objects/PlatformMemberObject";
import type { IPlatformMemberService } from "@/features/platformMembers/services";

builder.mutationFields((t) => ({
  createPlatformMember: t.field({
    type: PlatformMemberObject,
    args: {
      input: t.arg({ type: CreatePlatformMemberInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IPlatformMemberService>(
        TYPES.PlatformMemberService,
      );

      return service.createPlatformMember(
        {
          platformRoleId: input.platformRoleId,
          identityId: input.identityId,
          expiresAt: input.expiresAt ?? undefined,
          reason: input.reason ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
