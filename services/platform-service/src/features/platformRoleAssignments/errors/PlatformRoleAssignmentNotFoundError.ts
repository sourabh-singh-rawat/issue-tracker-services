import { ApplicationError } from "@pine/errors";

export class PlatformRoleAssignmentNotFoundError extends ApplicationError {
  constructor(message = "Platform role assignment not found") {
    super("PLATFORM_ROLE_ASSIGNMENT_NOT_FOUND", message, true);
  }
}
