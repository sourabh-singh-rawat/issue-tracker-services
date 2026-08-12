import { ApplicationError } from "@pine/errors";

export class TenantRoleKeyConflictError extends ApplicationError {
  constructor(message = "Tenant role key already exists") {
    super("TENANT_ROLE_KEY_CONFLICT", message, true);
  }
}
