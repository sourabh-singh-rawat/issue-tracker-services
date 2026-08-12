import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
import type { ICapabilityService } from "@/features/capabilities/services";

builder.queryFields((t) => ({
  getCapabilities: t.field({
    type: [CapabilityObject],
    resolve: async () => {
      const service = getContainer().get<ICapabilityService>(TYPES.CapabilityService);
      return service.getCapabilities();
    },
  }),
}));
