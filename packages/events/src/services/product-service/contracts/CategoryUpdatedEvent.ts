import { defineEvent } from "../../../cloud-events";
import { CategoryUpdatedDataSchema } from "../schemas";

export const CategoryUpdatedEvent = defineEvent({
  type: "product.category.updated",
  version: 1,
  schema: CategoryUpdatedDataSchema,
});
