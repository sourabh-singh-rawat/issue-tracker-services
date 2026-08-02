import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { CapabilityObject } from "@/features/permissions/graphql/objects/PermissionObject";
import type { IPermissionService } from "@/features/permissions/services";

builder.queryFields((t) => ({
  getCapabilities: t.field({
    type: [CapabilityObject],
    resolve: async () => {
      const service = container.get<IPermissionService>(TYPES.PermissionService);

      return service.getPermissions();
    },
  }),
}));
