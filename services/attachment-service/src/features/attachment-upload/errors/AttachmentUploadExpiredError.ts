import { ApplicationError } from "@pine/errors";

export class AttachmentUploadExpiredError extends ApplicationError {
  constructor(message = "Upload has expired") {
    super("ATTACHMENT_UPLOAD_EXPIRED", message, true);
  }
}
