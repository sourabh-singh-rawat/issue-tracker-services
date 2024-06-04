import { UserUpdatedPayload } from "@issue-tracker/event-bus";

export interface UserService {
  getDefaultWorkspaceId(userId: string): Promise<string>;
  updateUser(payload: UserUpdatedPayload): Promise<void>;
}
