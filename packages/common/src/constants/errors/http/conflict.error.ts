import { Errors } from "../errors";
import { ResponseError } from "./response-errors";
import { StatusCodes } from "http-status-codes";

export class ConflictError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.CONFLICT);

    this.errorCode = Errors.ERR_CONFLICT;
    this.errorMessage = message;
  }
}
