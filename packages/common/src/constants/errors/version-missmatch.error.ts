import { Errors } from "./errors";
import { StandardError } from "./standard.error";

export class VersionMismatchError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super();

    this.errorCode = Errors.ERR_VERSION_MISMATCH;
    this.errorMessage = "Version mismatch";
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
