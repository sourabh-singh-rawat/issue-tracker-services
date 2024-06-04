import { Errors } from "../errors";
import { ValidationError } from "./validation.error";

export class RequiredFieldError extends ValidationError {
  errorCode: string;
  errorMessage: string;

  constructor(fieldName: string) {
    const message = `${fieldName} is required, but is not provided`;

    super(message);

    this.errorCode = Errors.ERR_REQUIRED_FIELD;
    this.errorMessage = message;
  }
}
