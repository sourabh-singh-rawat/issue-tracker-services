import { Errors } from "../common/enums";
import { UnauthorizedError } from "./http";

export class InvalidCredentialsError extends UnauthorizedError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super();
    this.errorCode = Errors.ERR_INVALID_CREDENTIALS;
    this.errorMessage = "Invalid credentials";
  }
}
