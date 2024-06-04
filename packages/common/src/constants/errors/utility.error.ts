import { Errors } from "./errors";
import { StandardError } from "./standard.error";

export class UtilityError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_UTILITY;
    this.errorMessage = message;
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
