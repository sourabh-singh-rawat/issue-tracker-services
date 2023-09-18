import { NatsConnection } from "nats";
import {
  Publisher,
  Subjects,
  UserCreatedPayload,
} from "@sourabhrawatcc/core-utils";

export class UserUpdatedPublisher extends Publisher<{
  payload: string;
  subject: Subjects;
}> {
  subject = Subjects.USER_UPDATED;

  constructor(client: NatsConnection) {
    super(client);
  }
}
