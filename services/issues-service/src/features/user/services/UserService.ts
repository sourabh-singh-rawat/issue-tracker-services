import { injectable } from "inversify";
import { User } from "@/entities/User";
import { IUserService } from "./IUserService";

@injectable()
export class UserService implements IUserService {
  updateUser = async (payload: any) => {
    throw new Error("Method not implemented.");
  };

  async getDefaultWorkspaceId(userId: string) {
    const user = await User.findOneOrFail({ where: { id: userId } });

    return user.defaultWorkspaceId;
  }

  private async getUserById(userId: string) {
    return await User.findOne({ where: { id: userId } });
  }
}
