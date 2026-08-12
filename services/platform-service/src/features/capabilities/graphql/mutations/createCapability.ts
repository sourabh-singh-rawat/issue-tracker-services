import { builder } from "@pine/server";
import { getContainer } from "@/bootstrap/container-access";
import { TYPES } from "@/bootstrap/container-types";
import { CreateCapabilityInput } from "@/features/capabilities/graphql/inputs/CreateCapabilityInput";
import { CapabilityObject } from "@/features/capabilities/graphql/objects/CapabilityObject";
import type { ICapabilityService } from "@/features/capabilities/services";

builder.mutationFields((t) => ({
  createCapability: t.field({
    type: CapabilityObject,
    args: {
      input: t.arg({ type: CreateCapabilityInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = getContainer().get<ICapabilityService>(TYPES.CapabilityService);
      return service.createCapability({
        service: input.service,
        resource: input.resource,
        action: input.action,
      });
    },
  }),
}));
