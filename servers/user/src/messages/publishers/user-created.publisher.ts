import {
  MessageService,
  Publisher,
  Subjects,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";

export class UserCreatedPublisher extends Publisher<{
  payload: UserCreatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.USER_CREATED;

  constructor(messageService: MessageService) {
    super(messageService.client);
  }
}
