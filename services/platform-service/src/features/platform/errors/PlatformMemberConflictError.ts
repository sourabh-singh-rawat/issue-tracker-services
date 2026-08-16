import { ApplicationError } from "@pine/errors";

export class PlatformMemberConflictError extends ApplicationError {
  constructor(message = "Platform member already exists") {
    super("PLATFORM_MEMBER_CONFLICT", message, true);
  }
}
