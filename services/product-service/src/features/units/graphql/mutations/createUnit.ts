import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { CreateUnitInput } from "@/features/units/graphql/inputs/CreateUnitInput";
import { UnitObject } from "@/features/units/graphql/objects/UnitObject";
import type { IUnitService } from "@/features/units/services";

builder.mutationFields((t) => ({
  createUnit: t.field({
    type: UnitObject,
    args: {
      input: t.arg({ type: CreateUnitInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IUnitService>(TYPES.UnitService);

      return service.createUnit({
        code: input.code,
        name: input.name,
        symbol: input.symbol ?? undefined,
        isActive: input.isActive ?? undefined,
      });
    },
  }),
}));
