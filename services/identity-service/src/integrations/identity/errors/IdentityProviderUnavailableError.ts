import { ApplicationError } from "@pine/errors";
import { IdentityErrorCodes } from "@/integrations/identity/errors/IdentityErrorCodes";

export class IdentityProviderUnavailableError extends ApplicationError {
  constructor(message = "Identity provider is unavailable") {
    super(IdentityErrorCodes.IDENTITY_PROVIDER_UNAVAILABLE, message, false);
  }
}
