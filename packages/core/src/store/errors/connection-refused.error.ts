import { Errors } from "../../common/enums";
import { StandardError } from "../../error";

export class ConnectionRefusedError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super();

    this.errorCode = Errors.ERR_CONNECTION_REFUSED;
    this.errorMessage = message;
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
