import { ApplicationError } from "@pine/errors";

export class CapabilityKeyConflictError extends ApplicationError {
  constructor(message = "Capability key already exists") {
    super("CAPABILITY_KEY_CONFLICT", message, true);
  }
}
