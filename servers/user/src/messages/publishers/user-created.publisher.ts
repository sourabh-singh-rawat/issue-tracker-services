import {
  Messenger,
  Publisher,
  Subjects,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";

export class UserCreatedPublisher extends Publisher<{
  payload: UserCreatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.USER_CREATED;

  constructor(messenger: Messenger) {
    super(messenger.client);
  }
}
