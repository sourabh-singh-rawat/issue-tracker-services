import { Errors } from "../common/enums";
import { StandardError } from "./standard.error";

export class MissingSenderError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super();
    this.errorCode = Errors.ERR_MISSING_SENDER;
    this.errorMessage = "Missing sender";
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
