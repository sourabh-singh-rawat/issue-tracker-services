import { ApplicationError } from "@pine/errors";

export class InvalidGraphRelationshipBodyError extends ApplicationError {
  constructor(message = "Invalid graph relationship body") {
    super("INVALID_GRAPH_RELATIONSHIP_BODY", message, true);
  }
}
