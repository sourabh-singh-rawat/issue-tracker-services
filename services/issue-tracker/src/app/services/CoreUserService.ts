import { User } from "../../data";
import { UserService } from "./interfaces/UserService";

export class CoreUserService implements UserService {
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
