import { ApplicationError } from "@pine/errors";

export class PlatformRelationNotFoundError extends ApplicationError {
  constructor(message = "Platform relation not found") {
    super("PLATFORM_RELATION_NOT_FOUND", message, true);
  }
}
