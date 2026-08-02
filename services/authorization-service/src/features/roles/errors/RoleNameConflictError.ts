import { ApplicationError } from "@pine/errors";

export class RoleNameConflictError extends ApplicationError {
  constructor(message = "Role name already exists") {
    super("ROLE_NAME_CONFLICT", message, true);
  }
}
