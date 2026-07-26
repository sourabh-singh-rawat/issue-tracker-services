import { ApplicationError } from "@pine/errors";

export class InvalidCredentialError extends ApplicationError {
  constructor(message = "Invalid credentials") {
    super("INVALID_CREDENTIAL", message, true);
  }
}
