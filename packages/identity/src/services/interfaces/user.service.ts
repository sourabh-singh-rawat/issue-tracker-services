import { UserUpdatedPayload } from "@sourabhrawatcc/core-utils";

export interface UserService {
  updateUser(payload: UserUpdatedPayload): Promise<void>;
}
