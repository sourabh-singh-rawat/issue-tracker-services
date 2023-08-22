import { StandardError } from "@sourabhrawatcc/core-utils";

export class CreateUserError extends StandardError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super();
    this.errorCode = "ERR_CREATE_USER";
    this.errorMessage = "User creation was not successful";
  }
}
