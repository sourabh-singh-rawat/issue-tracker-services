import { ApplicationError } from "@pine/errors";

export class TenantMemberConflictError extends ApplicationError {
  constructor(message = "Tenant member already exists") {
    super("TENANT_MEMBER_CONFLICT", message, true);
  }
}
