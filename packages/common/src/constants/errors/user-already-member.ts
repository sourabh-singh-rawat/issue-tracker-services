import { ConflictError } from "./http";

export class UserAlreadyMember extends ConflictError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    super("User is already a member");
    this.errorCode = "ERR_USER_ALREADY_MEMBER";
    this.errorMessage = "User is already a member";
  }
}
