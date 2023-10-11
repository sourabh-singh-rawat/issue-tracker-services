import { NatsConnection } from "nats";
import {
  MessageService,
  Publisher,
  Subjects,
  UserUpdatedPayload,
} from "@sourabhrawatcc/core-utils";

export class UserUpdatedPublisher extends Publisher<{
  payload: UserUpdatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.USER_UPDATED;

  constructor(messageService: MessageService) {
    super(messageService.client);
  }
}
