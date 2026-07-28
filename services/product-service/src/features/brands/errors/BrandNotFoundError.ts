import { ApplicationError } from "@pine/errors";

export class BrandNotFoundError extends ApplicationError {
  constructor(message = "Brand not found") {
    super("BRAND_NOT_FOUND", message, true);
  }
}
