import { ApplicationError } from "@pine/errors";

export class InvalidPermissionKeyError extends ApplicationError {
  constructor(message = "Invalid permission key") {
    super("INVALID_PERMISSION_KEY", message, true);
  }
}
