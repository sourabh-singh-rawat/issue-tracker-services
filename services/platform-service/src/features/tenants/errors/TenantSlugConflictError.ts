import { ApplicationError } from "@pine/errors";

export class TenantSlugConflictError extends ApplicationError {
  constructor(message = "Tenant slug already exists") {
    super("TENANT_SLUG_CONFLICT", message, true);
  }
}
