import { ApplicationError } from "@pine/errors";

export class OrganizationRoleNotFoundError extends ApplicationError {
  constructor(message = "Organization role not found") {
    super("ORGANIZATION_ROLE_NOT_FOUND", message, true);
  }
}
