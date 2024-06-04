import { Errors } from "../errors";
import { StandardError } from "../standard.error";

export class ValidationError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_VALIDATION;
    this.errorMessage = message;
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: "some validation error" }] };
  }
}
