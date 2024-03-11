import { Errors } from "../../common/enums";
import { ValidationError } from "./validation.error";

export class MissingFieldError extends ValidationError {
  errorCode: string;
  errorMessage: string;

  constructor(message: string) {
    super(message);

    this.errorCode = Errors.ERR_MISSING_FIELD;
    this.errorMessage = message;
  }
}
