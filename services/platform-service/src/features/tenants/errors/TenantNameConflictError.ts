import { ApplicationError } from "@pine/errors";

export class TenantNameConflictError extends ApplicationError {
  constructor(message = "Tenant name already exists") {
    super("TENANT_NAME_CONFLICT", message, true);
  }
}
