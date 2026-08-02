import { ApplicationError } from "@pine/errors";

export class RoleNotFoundError extends ApplicationError {
  constructor(message = "Role not found") {
    super("ROLE_NOT_FOUND", message, true);
  }
}
