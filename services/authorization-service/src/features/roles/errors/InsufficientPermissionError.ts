import { ApplicationError } from "@pine/errors";

export class InsufficientPermissionError extends ApplicationError {
  constructor(message = "Insufficient permission") {
    super("INSUFFICIENT_PERMISSION", message, true);
  }
}
