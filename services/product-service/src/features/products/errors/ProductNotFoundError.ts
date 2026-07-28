import { ApplicationError } from "@pine/errors";

export class ProductNotFoundError extends ApplicationError {
  constructor(message = "Product not found") {
    super("PRODUCT_NOT_FOUND", message, true);
  }
}
