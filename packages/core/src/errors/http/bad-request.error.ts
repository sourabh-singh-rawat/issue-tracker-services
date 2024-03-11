import { StatusCodes } from "http-status-codes";
import { Errors } from "../../common/enums";
import { ResponseError } from "./response-errors";

export class BadRequestError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);

    this.errorCode = Errors.ERR_BAD_REQUEST;
    this.errorMessage = message;
  }
}
