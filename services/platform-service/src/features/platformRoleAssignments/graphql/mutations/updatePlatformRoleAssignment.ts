import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { UpdatePlatformRoleAssignmentInput } from "@/features/platformRoleAssignments/graphql/inputs/UpdatePlatformRoleAssignmentInput";
import { PlatformRoleAssignmentObject } from "@/features/platformRoleAssignments/graphql/objects/PlatformRoleAssignmentObject";
import type { IPlatformRoleAssignmentService } from "@/features/platformRoleAssignments/services";

builder.mutationFields((t) => ({
  updatePlatformRoleAssignment: t.field({
    type: PlatformRoleAssignmentObject,
    args: {
      input: t.arg({ type: UpdatePlatformRoleAssignmentInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IPlatformRoleAssignmentService>(
        TYPES.PlatformRoleAssignmentService,
      );

      return service.updatePlatformRoleAssignment(
        input.id,
        {
          expiresAt: input.expiresAt ?? undefined,
          reason: input.reason ?? undefined,
        },
        ctx.user!.id,
      );
    },
  }),
}));
