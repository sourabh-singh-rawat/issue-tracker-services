import { ApplicationError } from "@pine/errors";

export class PlatformRoleKeyConflictError extends ApplicationError {
  constructor(message = "Platform role key already exists") {
    super("PLATFORM_ROLE_KEY_CONFLICT", message, true);
  }
}
