import { Errors } from "./errors";
import { StandardError } from "./standard.error";

export class EmailAlreadySentError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super();
    this.errorCode = Errors.ERR_EMAIL_ALREADY_SENT;
    this.errorMessage = "Email already sent";
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
