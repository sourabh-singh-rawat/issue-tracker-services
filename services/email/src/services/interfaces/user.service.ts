import { UserCreatedPayload } from "@issue-tracker/event-bus";

export interface UserService {
  createUserAndEmailConfirmation(payload: UserCreatedPayload): Promise<void>;
}
