import { ApplicationError } from "@pine/errors";
import { IdentityErrorCodes } from "@/integrations/identity/errors/IdentityErrorCodes";

export class InvalidCredentialError extends ApplicationError {
  constructor(message = "Invalid credentials") {
    super(IdentityErrorCodes.INVALID_CREDENTIAL, message, true);
  }
}
