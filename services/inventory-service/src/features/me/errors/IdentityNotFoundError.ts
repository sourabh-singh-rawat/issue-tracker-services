import { ApplicationError } from "@pine/errors";

export class IdentityNotFoundError extends ApplicationError {
  constructor(message = "Identity not found") {
    super("IDENTITY_NOT_FOUND", message, true);
  }
}
