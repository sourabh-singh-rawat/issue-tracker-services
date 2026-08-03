import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
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
      const service = container.get<ICapabilityService>(TYPES.CapabilityService);

      return service.createCapability({
        service: input.service,
        resource: input.resource,
        action: input.action,
      });
    },
  }),
}));
