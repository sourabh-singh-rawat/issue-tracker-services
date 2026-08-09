import { defineEvent } from "../../../cloud-events";
import { CategoryCreatedDataSchema } from "../schemas";

export const CategoryCreatedEvent = defineEvent({
  type: "product.category.created",
  version: 1,
  schema: CategoryCreatedDataSchema,
});
