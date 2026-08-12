import { ApplicationError } from "@pine/errors";

export class PlatformRoleSystemProtectedError extends ApplicationError {
  constructor(message = "System platform roles cannot be modified or deleted") {
    super("PLATFORM_ROLE_SYSTEM_PROTECTED", message, true);
  }
}
