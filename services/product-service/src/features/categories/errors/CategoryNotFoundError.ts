import { ApplicationError } from "@pine/errors";

export class CategoryNotFoundError extends ApplicationError {
  constructor(message = "Category not found") {
    super("CATEGORY_NOT_FOUND", message, true);
  }
}
