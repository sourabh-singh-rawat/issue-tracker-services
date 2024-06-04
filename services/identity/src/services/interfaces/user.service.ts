import { UserUpdatedPayload } from "@issue-tracker/event-bus";

export interface UserService {
  updateUser(payload: UserUpdatedPayload): Promise<void>;
}
