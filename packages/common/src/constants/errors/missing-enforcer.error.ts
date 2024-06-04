import { Errors } from "./errors";
import { StandardError } from "./standard.error";

export class MissingEnforcerError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super();
    this.errorCode = Errors.ERR_MISSING_ENFORCER;
    this.errorMessage = "Missing enforcer error";
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
