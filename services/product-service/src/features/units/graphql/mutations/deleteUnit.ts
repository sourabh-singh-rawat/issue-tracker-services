import { builder } from "@pine/graphql-core";
import { container, TYPES } from "@/bootstrap";
import type { IUnitService } from "@/features/units/services";

builder.mutationFields((t) => ({
  deleteUnit: t.string({
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (_root, { id }) => {
      const service = container.get<IUnitService>(TYPES.UnitService);
      await service.deleteUnit(id);
      return "Unit deleted successfully.";
    },
  }),
}));
