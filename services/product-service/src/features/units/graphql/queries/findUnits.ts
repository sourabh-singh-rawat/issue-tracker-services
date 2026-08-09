import { builder } from "@pine/server";
import { container, TYPES } from "@/bootstrap";
import { UnitObject } from "@/features/units/graphql/objects/UnitObject";
import type { IUnitService } from "@/features/units/services";

builder.queryFields((t) => ({
  findUnits: t.field({
    type: [UnitObject],
    resolve: async () => {
      const service = container.get<IUnitService>(TYPES.UnitService);
      return service.listUnits();
    },
  }),
}));
