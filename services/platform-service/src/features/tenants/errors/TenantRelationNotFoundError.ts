import { ApplicationError } from "@pine/errors";

export class TenantRelationNotFoundError extends ApplicationError {
  constructor(message = "Tenant relation not found") {
    super("TENANT_RELATION_NOT_FOUND", message, true);
  }
}
