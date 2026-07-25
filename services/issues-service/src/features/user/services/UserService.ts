import { WORKSPACE_STATUS } from "@pine/common";
import { injectable } from "inversify";
import { User } from "@/entities/User";
import { Workspace } from "@/entities/Workspace";
import { IUserService, UpdateUserPayload } from "./IUserService";

@injectable()
export class UserService implements IUserService {
  updateUser = async (_payload: UpdateUserPayload) => {
    throw new Error("Method not implemented.");
  };

  async getDefaultWorkspaceId(userId: string) {
    const workspace = await Workspace.findOneOrFail({
      where: { createdById: userId, status: WORKSPACE_STATUS.DEFAULT },
    });

    return workspace.id;
  }

  private async getUserById(userId: string) {
    return await User.findOne({ where: { id: userId } });
  }
}
