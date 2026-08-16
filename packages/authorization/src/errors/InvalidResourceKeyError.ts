import { ApplicationError } from "@pine/errors";

export class InvalidResourceKeyError extends ApplicationError {
  constructor(message = "Invalid resource key") {
    super("INVALID_RESOURCE_KEY", message, true);
  }
}
