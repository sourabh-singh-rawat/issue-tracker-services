import { Errors } from "../../common/enums/errors";
import { StandardError } from "../../error/standard.error";

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
