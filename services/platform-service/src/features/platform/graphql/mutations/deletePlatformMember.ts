import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { IPlatformMemberService } from "@/features/platform/services";

builder.mutationFields((t) => ({
  deletePlatformMember: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IPlatformMemberService>(TYPES.PlatformMemberService);
      await service.delete(id, ctx.user!.id);
      return "Platform member deleted successfully.";
    },
  }),
}));
