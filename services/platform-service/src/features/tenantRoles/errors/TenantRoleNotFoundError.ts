import { ApplicationError } from "@pine/errors";

export class TenantRoleNotFoundError extends ApplicationError {
  constructor(message = "Tenant role not found") {
    super("TENANT_ROLE_NOT_FOUND", message, true);
  }
}
