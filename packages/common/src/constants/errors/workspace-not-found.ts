import { Errors } from "./errors";
import { NotFoundError } from "./http";

export class WorkspaceNotFound extends NotFoundError {
  errorCode: string;
  errorMessage: string;

  constructor() {
    const message = "Workspace not found";
    super(message);
    this.errorCode = Errors.ERR_WORKSPACE_NOT_FOUND;
    this.errorMessage = message;
  }
}
