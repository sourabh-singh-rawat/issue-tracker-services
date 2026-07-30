import { defineEvent } from "../../../cloud-events";
import { ProductCreatedDataSchema } from "../schemas";

export const ProductCreatedEvent = defineEvent({
  type: "product.product.created",
  version: 1,
  schema: ProductCreatedDataSchema,
});
