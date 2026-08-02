import { ApplicationError } from "@pine/errors";

export class OrganizationSlugConflictError extends ApplicationError {
  constructor(message = "Organization slug already exists") {
    super("ORGANIZATION_SLUG_CONFLICT", message, true);
  }
}
