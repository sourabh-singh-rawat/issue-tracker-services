import { UserNotFoundError } from "@sourabhrawatcc/core-utils";
import { databaseService } from "../../app/database-service";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { CoreUserService } from "../core-user.service";

jest.mock("../../app/database-service");
jest.mock("../../data/repositories/postgres-user.repository");

const userRepository = new PostgresUserRepository(databaseService);
const userService = new CoreUserService(userRepository);

describe("updateUser", () => {
  let userId = "user-id-1";
  let workspaceId = "workspace-id-1";

  it("can find a user with given id", async () => {
    await userService.updateUser(userId, workspaceId, 1);
    expect(userRepository.findById).toHaveBeenCalledWith(userId);
    expect(userRepository.findById).toReturnWith({ id: userId, version: 1 });
  });

  it("throws UserNotFound error if user is not found", async () => {
    try {
      await userService.updateUser(userId + "3", workspaceId, 1);
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);
    }
  });

  it("can call updateUser function", async () => {
    await userService.updateUser(userId, workspaceId, 1);
    expect(userRepository.updateUser).toHaveBeenCalled();
  });
});
