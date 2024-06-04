import { Errors } from "../errors";
import { ResponseError } from "./response-errors";
import { StatusCodes } from "http-status-codes";

export class BadRequestError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);

    this.errorCode = Errors.ERR_BAD_REQUEST;
    this.errorMessage = message;
  }
}
