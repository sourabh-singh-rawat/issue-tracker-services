import { UserEntity } from "../../data/entities";

export interface UserService {
  getDefaultWorkspaceId(userId: string): Promise<UserEntity | null>;
  updateUser(payload: any): Promise<void>;
}
