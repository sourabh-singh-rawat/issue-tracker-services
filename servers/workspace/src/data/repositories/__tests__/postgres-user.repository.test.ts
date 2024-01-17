import { databaseService } from "../../../app/stores/postgres-typeorm.store";
import { UserEntity } from "../../entities";
import { UserRepository } from "../interface/user-repository";
import { PostgresUserRepository } from "../postgres-user.repository";

jest.mock("../../../app/database-service");

let userRepository: UserRepository;

const mockUser = {
  id: "user-id",
  defaultWorkspaceId: "default-workspace-id",
};

beforeEach(() => {
  userRepository = new PostgresUserRepository(databaseService);
});

it("should save a user and return the saved user object", async () => {
  const user = new UserEntity();

  const savedUser = await userRepository.save(user);
  expect(databaseService.createQueryBuilder).toHaveBeenCalled();
  expect(savedUser).toBeDefined();
});

it("should return true, if user with given id exists", async () => {
  const userId = "some-user-id";
  const postgresFunctionName = "user_exists_by_id";

  (databaseService.query as jest.Mock).mockReturnValue([
    { [postgresFunctionName]: true },
  ]);
  const userExists = await userRepository.existsById(userId);
  expect(databaseService.query).toBeCalledWith(
    `SELECT * FROM ${postgresFunctionName}($1)`,
    [userId],
  );
  expect(userExists).toBe(true);
});

it("should return true, if user with given email exists", async () => {
  const email = "test@example.com";
  const postgresFunctionName = "user_exists_by_email";
  (databaseService.query as jest.Mock).mockReturnValue([
    { [postgresFunctionName]: true },
  ]);

  const userExists = await userRepository.existsByEmail(email);
  expect(databaseService.query).toBeCalledWith(
    `SELECT * FROM ${postgresFunctionName}($1)`,
    [email],
  );
  expect(userExists).toBe(true);
});

it("should return user, if user with given id exists", async () => {
  const userId = "some-user-id";
  (databaseService.query as jest.Mock).mockReturnValue([mockUser]);
  const user = await userRepository.findById(userId);
  expect(user).toBeDefined();
  expect(user).toHaveProperty("id");
});
