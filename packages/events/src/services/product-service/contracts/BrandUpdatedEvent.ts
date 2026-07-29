import { defineEvent } from "../../../cloud-events";
import { BrandUpdatedDataSchema } from "../schemas";

export const BrandUpdatedEvent = defineEvent({
  type: "product.brand.updated",
  version: 1,
  schema: BrandUpdatedDataSchema,
});
