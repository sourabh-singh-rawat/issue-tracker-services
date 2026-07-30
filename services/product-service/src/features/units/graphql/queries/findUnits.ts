import { builder } from "@pine/graphql-core";
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
