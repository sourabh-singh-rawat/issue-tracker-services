import { ApplicationError } from "@pine/errors";

export class PermissionNotFoundError extends ApplicationError {
  constructor(message = "Permission not found") {
    super("PERMISSION_NOT_FOUND", message, true);
  }
}
