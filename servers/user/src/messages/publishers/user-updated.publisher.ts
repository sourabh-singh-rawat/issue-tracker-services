import {
  Messenger,
  Publisher,
  Subjects,
  UserUpdatedPayload,
} from "@sourabhrawatcc/core-utils";

export class UserUpdatedPublisher extends Publisher<{
  payload: UserUpdatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.USER_UPDATED;

  constructor(messenger: Messenger) {
    super(messenger.client);
  }
}
