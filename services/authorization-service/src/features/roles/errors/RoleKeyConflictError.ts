import { ApplicationError } from "@pine/errors";

export class RoleKeyConflictError extends ApplicationError {
  constructor(message = "Role key already exists") {
    super("ROLE_KEY_CONFLICT", message, true);
  }
}
