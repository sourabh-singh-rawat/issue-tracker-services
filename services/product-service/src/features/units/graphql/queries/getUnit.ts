import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import { UnitObject } from "@/features/units/graphql/objects/UnitObject";
import type { IUnitService } from "@/features/units/services";

builder.queryFields((t) => ({
  getUnit: t.field({
    type: UnitObject,
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IUnitService>(TYPES.UnitService);
      return service.getUnitById(id);
    },
  }),
}));
