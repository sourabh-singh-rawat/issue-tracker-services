import { Errors, NotFoundError } from "@sourabhrawatcc/core-utils";

export class UserNotFoundError extends NotFoundError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    const message = "User not found";
    super(message);
    this.errorCode = Errors.ERR_NOT_FOUND;
    this.errorMessage = message;
  }
}
