import { ApplicationError } from "@pine/errors";

export class PlatformMemberNotFoundError extends ApplicationError {
  constructor(message = "Platform member not found") {
    super("PLATFORM_MEMBER_NOT_FOUND", message, true);
  }
}
