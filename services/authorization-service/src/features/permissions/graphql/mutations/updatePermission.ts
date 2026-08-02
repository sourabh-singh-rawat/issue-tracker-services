import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { UpdateCapabilityInput } from "@/features/permissions/graphql/inputs/UpdatePermissionInput";
import { CapabilityObject } from "@/features/permissions/graphql/objects/PermissionObject";
import type { IPermissionService } from "@/features/permissions/services";

builder.mutationFields((t) => ({
  updateCapability: t.field({
    type: CapabilityObject,
    args: {
      input: t.arg({ type: UpdateCapabilityInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IPermissionService>(TYPES.PermissionService);

      return service.updatePermission(input.key, {
        name: input.name ?? undefined,
        description: input.description ?? undefined,
      });
    },
  }),
}));
