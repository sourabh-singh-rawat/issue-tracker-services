import { ApplicationError } from "@pine/errors";

export class InvalidCheckRelationshipBodyError extends ApplicationError {
  constructor(message = "Invalid check relationship body") {
    super("INVALID_CHECK_RELATIONSHIP_BODY", message, true);
  }
}
