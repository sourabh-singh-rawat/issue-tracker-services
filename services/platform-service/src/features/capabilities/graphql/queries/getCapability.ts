import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
import type { ICapabilityService } from "@/features/capabilities/services";

builder.queryFields((t) => ({
  getCapability: t.field({
    type: CapabilityObject,
    args: {
      key: t.arg.string({ required: true }),
    },
    resolve: async (_root, { key }) => {
      const service = getContainer().get<ICapabilityService>(TYPES.CapabilityService);
      return service.getCapabilityByKey(key);
    },
  }),
}));
