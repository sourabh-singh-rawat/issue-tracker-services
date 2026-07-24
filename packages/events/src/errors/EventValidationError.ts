import { ApplicationError } from "@pine/errors";
import type { AssertError } from "typebox/value";

export type SchemaValidationErrors = AssertError["cause"]["errors"];

export class EventValidationError extends ApplicationError {
  readonly errors: SchemaValidationErrors | undefined;

  constructor(message: string, errors?: SchemaValidationErrors) {
    super("EVENT_VALIDATION_ERROR", message, true);
    this.name = "EventValidationError";
    this.errors = errors;
  }
}
