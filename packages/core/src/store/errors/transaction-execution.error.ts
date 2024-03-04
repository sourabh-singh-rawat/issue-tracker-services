import { Errors } from "../../common/enums/errors";
import { StandardError } from "../../error/standard.error";

export class TransactionExecutionError extends StandardError {
  errorCode;
  errorMessage;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_TRANSACTION_EXECUTION;
    this.errorMessage = message;
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
