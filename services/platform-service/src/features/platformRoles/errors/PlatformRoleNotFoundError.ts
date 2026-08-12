import { ApplicationError } from "@pine/errors";

export class PlatformRoleNotFoundError extends ApplicationError {
  constructor(message = "Platform role not found") {
    super("PLATFORM_ROLE_NOT_FOUND", message, true);
  }
}
