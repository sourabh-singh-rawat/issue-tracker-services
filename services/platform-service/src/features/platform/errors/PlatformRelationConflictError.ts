import { ApplicationError } from "@pine/errors";

export class PlatformRelationConflictError extends ApplicationError {
  constructor(message = "Platform relation already exists") {
    super("PLATFORM_RELATION_CONFLICT", message, true);
  }
}
