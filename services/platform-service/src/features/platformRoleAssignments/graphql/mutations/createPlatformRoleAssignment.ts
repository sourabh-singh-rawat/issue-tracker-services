import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { CreatePlatformRoleAssignmentInput } from "@/features/platformRoleAssignments/graphql/inputs/CreatePlatformRoleAssignmentInput";
import { PlatformRoleAssignmentObject } from "@/features/platformRoleAssignments/graphql/objects/PlatformRoleAssignmentObject";
import type { IPlatformRoleAssignmentService } from "@/features/platformRoleAssignments/services";

builder.mutationFields((t) => ({
  createPlatformRoleAssignment: t.field({
    type: PlatformRoleAssignmentObject,
    args: {
      input: t.arg({ type: CreatePlatformRoleAssignmentInput, required: true }),
    },
    resolve: async (_root, { input }, ctx) => {
      const service = container.get<IPlatformRoleAssignmentService>(
        TYPES.PlatformRoleAssignmentService,
      );

      return service.createPlatformRoleAssignment(
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
