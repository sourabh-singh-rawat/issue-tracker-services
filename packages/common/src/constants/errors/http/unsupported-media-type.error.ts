import { Errors } from "../errors";
import { ResponseError } from "./response-errors";
import { StatusCodes } from "http-status-codes";

export class UnsupportedMediaTypeError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.UNSUPPORTED_MEDIA_TYPE);

    this.errorCode = Errors.ERR_UNSUPPORTED_MEDIA_TYPE;
    this.errorMessage = message;
  }
}
