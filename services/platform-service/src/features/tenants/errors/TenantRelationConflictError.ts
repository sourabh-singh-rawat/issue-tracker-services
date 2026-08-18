import { ApplicationError } from "@pine/errors";

export class TenantRelationConflictError extends ApplicationError {
  constructor(message = "Tenant relation already exists") {
    super("TENANT_RELATION_CONFLICT", message, true);
  }
}
