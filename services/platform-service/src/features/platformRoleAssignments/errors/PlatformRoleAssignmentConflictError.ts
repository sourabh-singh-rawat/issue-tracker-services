import { ApplicationError } from "@pine/errors";

export class PlatformRoleAssignmentConflictError extends ApplicationError {
  constructor(message = "Platform role assignment already exists") {
    super("PLATFORM_ROLE_ASSIGNMENT_CONFLICT", message, true);
  }
}
