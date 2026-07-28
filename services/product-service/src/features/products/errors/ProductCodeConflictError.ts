import { ApplicationError } from "@pine/errors";

export class ProductCodeConflictError extends ApplicationError {
  constructor(message = "Product code already exists") {
    super("PRODUCT_CODE_CONFLICT", message, true);
  }
}
