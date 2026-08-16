import { ApplicationError } from "@pine/errors";

export class InvalidPlatformRelationError extends ApplicationError {
  constructor(message = "Invalid platform relation") {
    super("INVALID_PLATFORM_RELATION", message, true);
  }
}
