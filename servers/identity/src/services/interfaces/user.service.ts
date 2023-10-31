export interface UserService {
  updateUser(
    userId: string,
    defaultWorkspaceId: string,
    version: number,
  ): Promise<void>;
}
