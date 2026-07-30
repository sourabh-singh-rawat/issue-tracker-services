import { ApplicationError } from "@pine/errors";

export class OutboxInvalidPayloadError extends ApplicationError {
  constructor(message = "Outbox message payload is invalid") {
    super("OUTBOX_INVALID_PAYLOAD", message, true);
    this.name = "OutboxInvalidPayloadError";
  }
}
