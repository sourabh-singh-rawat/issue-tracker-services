import { databaseService } from "../../app/database-service";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { CoreUserService } from "../core-user.service";
import { UserService } from "../interfaces/user.service";
import {
  UserNotFoundError,
  VersionMismatchError,
} from "@sourabhrawatcc/core-utils";

jest.mock("../../app/database-service");
jest.mock("../../data/repositories/postgres-user.repository");

const userRepository = new PostgresUserRepository(databaseService);

let userService: UserService;

beforeEach(() => {
  userService = new CoreUserService(userRepository);
});

describe("updateUser", () => {
  const userId = "user-id";
  const workspaceId = "workspace-id";
  const version = 1;

  it("should throw error if user is not found", async () => {
    try {
      (userRepository.findById as jest.Mock).mockReturnValueOnce(null);
      await userService.updateUser(userId, workspaceId, 1);
    } catch (error) {
      expect(error).toBeInstanceOf(UserNotFoundError);
    }
  });

  it("should throw error if version is not matched", async () => {
    try {
      await userService.updateUser(userId, workspaceId, 2);
    } catch (error) {
      expect(error).toBeInstanceOf(VersionMismatchError);
    }
  });

  it("should call updateUser function", async () => {
    await userService.updateUser(userId, workspaceId, version);

    expect(userRepository.updateUser).toHaveBeenCalled();
  });
});
