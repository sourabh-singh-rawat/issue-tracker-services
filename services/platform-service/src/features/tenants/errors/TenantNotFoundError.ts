import { ApplicationError } from "@pine/errors";

export class TenantNotFoundError extends ApplicationError {
  constructor(message = "Tenant not found") {
    super("TENANT_NOT_FOUND", message, true);
  }
}
