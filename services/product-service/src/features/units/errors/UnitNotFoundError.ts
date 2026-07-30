import { ApplicationError } from "@pine/errors";

export class UnitNotFoundError extends ApplicationError {
  constructor(message = "Unit not found") {
    super("UNIT_NOT_FOUND", message, true);
  }
}
