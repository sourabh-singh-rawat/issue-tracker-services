import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { IPlatformMemberService } from "@/features/platformMembers/services";

builder.mutationFields((t) => ({
  deletePlatformMember: t.string({
    args: {
      id: t.arg.string({ required: true }),
      platformId: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id, platformId }, ctx) => {
      const service = container.get<IPlatformMemberService>(
        TYPES.PlatformMemberService,
      );
      await service.deletePlatformMember(id, platformId, ctx.user!.id);
      return "Platform role assignment deleted successfully.";
    },
  }),
}));
