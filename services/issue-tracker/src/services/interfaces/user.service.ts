import { UserUpdatedPayload } from "@issue-tracker/event-bus";
import { UserEntity } from "../../data/entities";

export interface UserService {
  getDefaultWorkspaceId(userId: string): Promise<UserEntity | null>;
  updateUser(payload: UserUpdatedPayload): Promise<void>;
}
