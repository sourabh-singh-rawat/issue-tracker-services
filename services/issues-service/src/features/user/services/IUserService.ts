export type UpdateUserPayload = {
  id: string;
};

export interface IUserService {
  updateUser(payload: UpdateUserPayload): Promise<void>;
}
