import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { CapabilityObject } from "@/features/permissions/graphql/objects/PermissionObject";
import type { IPermissionService } from "@/features/permissions/services";

builder.queryFields((t) => ({
  getCapability: t.field({
    type: CapabilityObject,
    args: {
      key: t.arg.string({ required: true }),
    },
    resolve: async (_root, { key }) => {
      const service = container.get<IPermissionService>(TYPES.PermissionService);

      return service.getPermissionByKey(key);
    },
  }),
}));
