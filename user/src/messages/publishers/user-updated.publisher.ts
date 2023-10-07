import { NatsConnection } from "nats";
import {
  Publisher,
  Subjects,
  UserUpdatedPayload,
} from "@sourabhrawatcc/core-utils";

export class UserUpdatedPublisher extends Publisher<{
  payload: UserUpdatedPayload;
  subject: Subjects;
}> {
  subject = Subjects.USER_UPDATED;

  constructor(client?: NatsConnection) {
    super(client);
  }
}
