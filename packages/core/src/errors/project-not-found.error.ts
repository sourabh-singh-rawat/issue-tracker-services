import { Errors } from "../common/enums";
import { NotFoundError } from "./http";

export class ProjectNotFoundError extends NotFoundError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    const message = "Project not found";
    super(message);
    this.errorCode = Errors.ERR_PROJECT_NOT_FOUND;
    this.errorMessage = message;
  }
}
