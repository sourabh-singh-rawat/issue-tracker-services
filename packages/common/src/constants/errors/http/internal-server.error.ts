import { Errors } from "../errors";
import { ResponseError } from "./response-errors";
import { StatusCodes } from "http-status-codes";

export class InternalServerError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);

    this.errorCode = Errors.ERR_INTERNAL_SERVER;
    this.errorMessage = message;
  }
}
