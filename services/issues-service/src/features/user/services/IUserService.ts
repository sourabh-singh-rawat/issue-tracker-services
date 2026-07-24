export interface IUserService {
  getDefaultWorkspaceId(userId: string): Promise<string>;
  updateUser(payload: any): Promise<void>;
}
