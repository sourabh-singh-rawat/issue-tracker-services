import { User } from "../../data/entities";

export interface UserService {
  getDefaultWorkspaceId(userId: string): Promise<string>;
  updateUser(payload: any): Promise<void>;
}
