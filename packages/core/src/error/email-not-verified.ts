import { Errors } from "../common/enums";
import { BadRequestError } from "./http";

export class EmailNotVerifiedError extends BadRequestError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    const message = "Email not verified";
    super(message);

    this.errorCode = Errors.ERR_EMAIL_NOT_VERIFIED;
    this.errorMessage = message;
  }
}
