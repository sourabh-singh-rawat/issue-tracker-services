import { User } from "../../data/entities";

export interface UserService {
  getDefaultWorkspaceId(userId: string): Promise<User | null>;
  updateUser(payload: any): Promise<void>;
}
