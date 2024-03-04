import { Errors } from "../../common/enums";
import { StandardError } from "../standard.error";

export class ResponseError extends StandardError {
  errorCode: string;
  errorMessage: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    this.errorCode = Errors.ERR_RESPONSE;
    this.errorMessage = message;
    this.statusCode = statusCode;
  }

  serializeError(): { errors: [{ message: string; field?: string }] } {
    return { errors: [{ message: this.errorMessage }] };
  }
}
