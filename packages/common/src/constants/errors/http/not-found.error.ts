import { Errors } from "../errors";
import { ResponseError } from "./response-errors";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND);

    this.errorCode = Errors.ERR_NOT_FOUND;
    this.errorMessage = message;
  }
}
