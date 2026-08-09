import { ApplicationError } from "@pine/errors";

export class CapabilityNotFoundError extends ApplicationError {
  constructor(message = "Capability not found") {
    super("CAPABILITY_NOT_FOUND", message, true);
  }
}
