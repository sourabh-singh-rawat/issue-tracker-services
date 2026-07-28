import { ApplicationError } from "@pine/errors";

export class ProductSkuConflictError extends ApplicationError {
  constructor(message = "Product SKU already exists") {
    super("PRODUCT_SKU_CONFLICT", message, true);
  }
}
