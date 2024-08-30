import { UserRegisteredPayload } from "@issue-tracker/event-bus";

export interface UserEmailService {
  createUserAndSendRegistrationEmail(
    payload: UserRegisteredPayload,
  ): Promise<void>;
}
