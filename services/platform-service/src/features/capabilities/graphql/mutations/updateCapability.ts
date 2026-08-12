import { builder } from "@pine/server";
import { container } from "@/bootstrap/container";
import { TYPES } from "@/bootstrap/container-types";
import { UpdateCapabilityInput } from "@/features/capabilities/graphql/inputs/UpdateCapabilityInput";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
import type { ICapabilityService } from "@/features/capabilities/services";

builder.mutationFields((t) => ({
  updateCapability: t.field({
    type: CapabilityObject,
    args: {
      input: t.arg({ type: UpdateCapabilityInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<ICapabilityService>(TYPES.CapabilityService);
      return service.updateCapability(input.key, {
        service: input.service ?? undefined,
        resource: input.resource ?? undefined,
        action: input.action ?? undefined,
      });
    },
  }),
}));
