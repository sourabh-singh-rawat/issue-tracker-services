import { NatsConnection } from "nats";
import { Publisher, Subjects } from "@sourabhrawatcc/core-utils";

export interface UserCreatedPayload {
  userId: string;
}

export class UserCreatedPublisher extends Publisher<{
  payload: UserCreatedPayload;
  subject: Subjects.USER_CREATED;
}> {
  subject = Subjects.USER_CREATED;

  constructor(client: NatsConnection) {
    super(client);
  }
}
