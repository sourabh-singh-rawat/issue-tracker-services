import { ConflictError } from "./http";

export class UserAlreadyExists extends ConflictError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super("User already exists");
    this.errorCode = "ERR_CREATE_USER";
    this.errorMessage = "User already exists";
  }
}
