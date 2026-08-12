import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import type { IPlatformRoleAssignmentService } from "@/features/platformRoleAssignments/services";

builder.mutationFields((t) => ({
  deletePlatformRoleAssignment: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = container.get<IPlatformRoleAssignmentService>(
        TYPES.PlatformRoleAssignmentService,
      );
      await service.deletePlatformRoleAssignment(id, ctx.user!.id);
      return "Platform role assignment deleted successfully.";
    },
  }),
}));
