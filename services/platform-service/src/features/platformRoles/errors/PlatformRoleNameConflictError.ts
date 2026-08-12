import { ApplicationError } from "@pine/errors";

export class PlatformRoleNameConflictError extends ApplicationError {
  constructor(message = "Platform role name already exists") {
    super("PLATFORM_ROLE_NAME_CONFLICT", message, true);
  }
}
