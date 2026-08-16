import { ApplicationError } from "@pine/errors";

export class InvalidTenantRelationError extends ApplicationError {
  constructor(message = "Invalid tenant relation") {
    super("INVALID_TENANT_RELATION", message, true);
  }
}
