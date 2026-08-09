import { ApplicationError } from "@pine/errors";

export class BrandCodeConflictError extends ApplicationError {
  constructor(message = "Brand code already exists") {
    super("BRAND_CODE_CONFLICT", message, true);
  }
}
