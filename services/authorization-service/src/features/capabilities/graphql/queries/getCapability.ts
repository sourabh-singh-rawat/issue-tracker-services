import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
import type { ICapabilityService } from "@/features/capabilities/services";

builder.queryFields((t) => ({
  getCapability: t.field({
    type: CapabilityObject,
    args: {
      key: t.arg.string({ required: true }),
    },
    resolve: async (_root, { key }) => {
      const service = container.get<ICapabilityService>(TYPES.CapabilityService);

      return service.getCapabilityByKey(key);
    },
  }),
}));
