import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { PlatformRoleAssignmentObject } from "@/features/platformRoleAssignments/graphql/objects/PlatformRoleAssignmentObject";
import type { IPlatformRoleAssignmentService } from "@/features/platformRoleAssignments/services";

builder.queryFields((t) => ({
  getPlatformRoleAssignment: t.field({
    type: PlatformRoleAssignmentObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }, ctx) => {
      const service = getContainer().get<IPlatformRoleAssignmentService>(
        TYPES.PlatformRoleAssignmentService,
      );
      return service.getPlatformRoleAssignmentById(id, ctx.user!.id);
    },
  }),
}));
