import { StatusCodes } from "http-status-codes";
import { Errors } from "../../common/enums";
import { ResponseError } from "./response-errors";

export class ConflictError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);

    this.errorCode = Errors.ERR_CONFLICT;
    this.errorMessage = message;
  }
}
