import { ApplicationError } from "@pine/errors";

export class OrganizationRoleKeyConflictError extends ApplicationError {
  constructor(message = "Organization role key already exists") {
    super("ORGANIZATION_ROLE_KEY_CONFLICT", message, true);
  }
}
