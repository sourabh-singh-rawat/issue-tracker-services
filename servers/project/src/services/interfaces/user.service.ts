import {
  ServiceResponse,
  UserUpdatedPayload,
} from "@sourabhrawatcc/core-utils";

export interface UserService {
  getDefaultWorkspaceId(userId: string): Promise<ServiceResponse<string>>;
  updateUser(payload: UserUpdatedPayload): Promise<void>;
}
