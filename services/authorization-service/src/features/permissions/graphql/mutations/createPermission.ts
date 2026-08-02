import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { CreateCapabilityInput } from "@/features/permissions/graphql/inputs/CreatePermissionInput";
import { CapabilityObject } from "@/features/permissions/graphql/objects/PermissionObject";
import type { IPermissionService } from "@/features/permissions/services";

builder.mutationFields((t) => ({
  createCapability: t.field({
    type: CapabilityObject,
    args: {
      input: t.arg({ type: CreateCapabilityInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IPermissionService>(TYPES.PermissionService);

      return service.createPermission({
        key: input.key,
        name: input.name,
        description: input.description ?? undefined,
      });
    },
  }),
}));
