import { ApplicationError } from "@pine/errors";
import { IdentityErrorCodes } from "@/integrations/identity/errors/IdentityErrorCodes";

export class IdentityAlreadyExistsError extends ApplicationError {
  constructor(message = "Identity already exists") {
    super(IdentityErrorCodes.IDENTITY_ALREADY_EXISTS, message, true);
  }
}
