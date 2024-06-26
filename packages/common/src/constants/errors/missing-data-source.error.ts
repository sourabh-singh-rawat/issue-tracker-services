import { Errors } from "./errors";
import { StandardError } from "./standard.error";

export class MissingDataSource extends StandardError {
  errorCode;
  errorMessage;

  constructor() {
    super();

    this.errorCode = Errors.ERR_MISSING_DATASOURCE;
    this.errorMessage = "Missing DataSource";
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
