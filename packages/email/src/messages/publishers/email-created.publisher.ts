import {
  EmailCreatedPayload,
  Messenger,
  Publisher,
  Subjects,
} from "@sourabhrawatcc/core-utils";

export class EmailCreatedPublisher extends Publisher<{
  subject: Subjects.EMAIL_CREATED;
  payload: EmailCreatedPayload;
}> {
  readonly subject = Subjects.EMAIL_CREATED;

  constructor(messenger: Messenger) {
    super(messenger.client);
  }
}
