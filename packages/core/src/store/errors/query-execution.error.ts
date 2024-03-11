import { Errors } from "../../errors/errors";
import { StandardError } from "../../errors/standard.error";

export class QueryExecutionError extends StandardError {
  errorCode;
  errorMessage;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_QUERY_EXECUTION;
    this.errorMessage = message;
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
