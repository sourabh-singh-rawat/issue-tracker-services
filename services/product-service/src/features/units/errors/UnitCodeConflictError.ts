import { ApplicationError } from "@pine/errors";

export class UnitCodeConflictError extends ApplicationError {
  constructor(message = "Unit code already exists") {
    super("UNIT_CODE_CONFLICT", message, true);
  }
}
