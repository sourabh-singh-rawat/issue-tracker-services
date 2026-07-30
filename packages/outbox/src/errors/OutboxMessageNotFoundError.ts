import { ApplicationError } from "@pine/errors";

export class OutboxMessageNotFoundError extends ApplicationError {
  constructor(message = "Outbox message not found") {
    super("OUTBOX_MESSAGE_NOT_FOUND", message, true);
    this.name = "OutboxMessageNotFoundError";
  }
}
