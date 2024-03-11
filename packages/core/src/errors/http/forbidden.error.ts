import { StatusCodes } from "http-status-codes";
import { Errors } from "../../common/enums";
import { ResponseError } from "./response-errors";

export class ForbiddenError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);

    this.errorCode = Errors.ERR_FORBIDDEN;
    this.errorMessage = message;
  }
}
