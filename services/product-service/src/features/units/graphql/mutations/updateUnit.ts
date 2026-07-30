import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { UpdateUnitInput } from "@/features/units/graphql/inputs/UpdateUnitInput";
import { UnitObject } from "@/features/units/graphql/objects/UnitObject";
import type { IUnitService } from "@/features/units/services";

builder.mutationFields((t) => ({
  updateUnit: t.field({
    type: UnitObject,
    args: {
      input: t.arg({ type: UpdateUnitInput, required: true }),
    },
    resolve: async (_root, { input }) => {
      const service = container.get<IUnitService>(TYPES.UnitService);

      return service.updateUnit(input.unitId, {
        code: input.code ?? undefined,
        name: input.name ?? undefined,
        symbol: input.symbol ?? undefined,
        isActive: input.isActive ?? undefined,
      });
    },
  }),
}));
