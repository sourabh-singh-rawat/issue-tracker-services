import { defineEvent } from "../../../cloud-events";
import { BrandCreatedDataSchema } from "../schemas";

export const BrandCreatedEvent = defineEvent({
  type: "product.brand.created",
  version: 1,
  schema: BrandCreatedDataSchema,
});
