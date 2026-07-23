import { ApplicationError } from "@pine/errors";
import { IdentityErrorCodes } from "@/integrations/identity/errors/IdentityErrorCodes";

export class IdentityNotFoundError extends ApplicationError {
  constructor(message = "Identity not found") {
    super(IdentityErrorCodes.IDENTITY_NOT_FOUND, message, true);
  }
}
