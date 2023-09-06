import { Errors, NotFoundError } from "@sourabhrawatcc/core-utils";

export class UserProfileNotFoundError extends NotFoundError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    const message = "User profile not found";
    super(message);
    this.errorCode = Errors.ERR_NOT_FOUND;
    this.errorMessage = message;
  }
}
