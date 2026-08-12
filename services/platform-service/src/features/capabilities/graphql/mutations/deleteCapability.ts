import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import type { ICapabilityService } from "@/features/capabilities/services";

builder.mutationFields((t) => ({
  deleteCapability: t.string({
    args: {
      key: t.arg.string({ required: true }),
    },
    resolve: async (_root, { key }) => {
      const service = getContainer().get<ICapabilityService>(TYPES.CapabilityService);
      await service.deleteCapability(key);
      return "Capability deleted successfully.";
    },
  }),
}));
