import { ServiceResponse } from "@issue-tracker/common";

export interface UserService {
  getDefaultWorkspaceId(userId: string): Promise<ServiceResponse<string>>;
  updateUser(
    userId: string,
    defaultWorkspaceId: string,
    version: number,
  ): Promise<void>;
}
