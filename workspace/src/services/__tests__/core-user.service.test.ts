import { databaseService } from "../../app/database-service";
import { PostgresUserRepository } from "../../data/repositories/postgres-user.repository";
import { CoreUserService } from "../core-user.service";

jest.mock("../../app/database-service");
jest.mock("../../data/repositories/postgres-user.repository");

const userRepository = new PostgresUserRepository(databaseService);
const userService = new CoreUserService(userRepository);

it("can update a user", async () => {
  await userService.updateUser("user-id", "workspace-id", 1);
  expect(userRepository.updateUser).toBeCalled();
});
