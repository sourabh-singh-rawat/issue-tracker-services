export type UpdateUserPayload = {
  id: string;
};

export interface IUserService {
  getDefaultWorkspaceId(userId: string): Promise<string>;
  updateUser(payload: UpdateUserPayload): Promise<void>;
}
