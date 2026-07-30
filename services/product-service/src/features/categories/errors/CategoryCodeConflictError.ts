import { ApplicationError } from "@pine/errors";

export class CategoryCodeConflictError extends ApplicationError {
  constructor(message = "Category code already exists") {
    super("CATEGORY_CODE_CONFLICT", message, true);
  }
}
