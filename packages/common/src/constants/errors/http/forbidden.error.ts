import { Errors } from "../errors";
import { ResponseError } from "./response-errors";
import { StatusCodes } from "http-status-codes";

export class ForbiddenError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN);

    this.errorCode = Errors.ERR_FORBIDDEN;
    this.errorMessage = message;
  }
}
