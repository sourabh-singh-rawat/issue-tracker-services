import { StatusCodes } from "http-status-codes";
import { Errors } from "../../common/enums";
import { ResponseError } from "./response-errors";

export class UnsupportedMediaTypeError extends ResponseError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message, StatusCodes.UNSUPPORTED_MEDIA_TYPE);

    this.errorCode = Errors.ERR_UNSUPPORTED_MEDIA_TYPE;
    this.errorMessage = message;
  }
}
