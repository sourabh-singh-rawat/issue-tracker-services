import { UserRegisteredPayload } from "@issue-tracker/event-bus";

export interface UserService {
  createUserAndEmailConfirmation(payload: UserRegisteredPayload): Promise<void>;
}
