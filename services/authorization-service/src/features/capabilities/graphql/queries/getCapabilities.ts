import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
import type { ICapabilityService } from "@/features/capabilities/services";

builder.queryFields((t) => ({
  getCapabilities: t.field({
    type: [CapabilityObject],
    resolve: async () => {
      const service = container.get<ICapabilityService>(TYPES.CapabilityService);

      return service.getCapabilities();
    },
  }),
}));
