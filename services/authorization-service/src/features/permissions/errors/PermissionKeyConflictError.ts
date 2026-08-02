import { ApplicationError } from "@pine/errors";

export class PermissionKeyConflictError extends ApplicationError {
  constructor(message = "Permission key already exists") {
    super("PERMISSION_KEY_CONFLICT", message, true);
  }
}
