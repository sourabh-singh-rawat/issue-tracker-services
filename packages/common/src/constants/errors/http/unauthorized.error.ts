import { Errors } from "../errors";
import { ResponseError } from "./response-errors";
import { StatusCodes } from "http-status-codes";

export class UnauthorizedError extends ResponseError {
  errorCode: string;

  constructor(message: string = "unauthorized") {
    super(message, StatusCodes.UNAUTHORIZED);

    this.errorCode = Errors.ERR_UNAUTHORIZED;
  }
}
