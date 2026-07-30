import { injectable } from "inversify";
import type { IUserService, UpdateUserPayload } from "./IUserService";

@injectable()
export class UserService implements IUserService {
  updateUser = async (_payload: UpdateUserPayload) => {
    throw new Error("Method not implemented.");
  };
}
