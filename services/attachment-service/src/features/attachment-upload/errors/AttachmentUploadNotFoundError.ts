import { ApplicationError } from "@pine/errors";

export class AttachmentUploadNotFoundError extends ApplicationError {
  constructor(message = "Attachment upload not found") {
    super("ATTACHMENT_UPLOAD_NOT_FOUND", message, true);
  }
}
