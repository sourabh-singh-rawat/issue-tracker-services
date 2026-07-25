import { ApplicationError } from "@pine/errors";
import type { SchemaValidationErrors } from "./EventValidationError";

export class CloudEventValidationError extends ApplicationError {
  readonly errors: SchemaValidationErrors;

  constructor(errors: SchemaValidationErrors) {
    const summary = errors
      .map((error) => `${error.instancePath || "/"}: ${error.message}`)
      .join("; ");
    super(
      "CLOUD_EVENT_VALIDATION_ERROR",
      `Invalid CloudEvent: ${summary || "schema validation failed"}`,
      true,
    );
    this.name = "CloudEventValidationError";
    this.errors = errors;
  }
}
