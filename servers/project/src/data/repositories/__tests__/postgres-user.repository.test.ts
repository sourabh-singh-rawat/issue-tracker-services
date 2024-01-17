import { postgresTypeormStore } from "../../../app/stores/postgres-typeorm.store";
import { UserEntity } from "../../entities";
import { UserRepository } from "../interfaces/user.repository";
import { PostgresUserRepository } from "../postgres-user.repository";

jest.mock("../../../app/stores/postgres-typeorm.store");

let userRepository: UserRepository;

const mockUser = {
  id: "user-id",
  defaultWorkspaceId: "default-workspace-id",
};

beforeEach(() => {
  userRepository = new PostgresUserRepository(postgresTypeormStore);
});

describe("save user", () => {
  const user = new UserEntity();

  it("should create a query builder", async () => {
    await userRepository.save(user);
    expect(postgresTypeormStore.createQueryBuilder).toHaveBeenCalled();
  });

  it("should pass query runner to query builder if provided", async () => {
    const queryRunner = postgresTypeormStore.createQueryRunner();
    await userRepository.save(user, { queryRunner });

    expect(postgresTypeormStore.createQueryBuilder).toHaveBeenCalled();
  });

  const mockQueryBuilder = postgresTypeormStore.createQueryBuilder();
  it("should call insert function with no arguments", async () => {
    await userRepository.save(user);
    expect(mockQueryBuilder.insert).toHaveBeenCalled();
  });

  it("should call into with UserEntity", async () => {
    await userRepository.save(user);
    expect(mockQueryBuilder.insert().into).toHaveBeenCalledWith(UserEntity);
  });

  it("should call values function with user", async () => {
    await userRepository.save(user);
    expect(
      mockQueryBuilder.insert().into(UserEntity).values,
    ).toHaveBeenCalledWith(user);
  });

  it("should call returning function with *", async () => {
    await userRepository.save(user);
    expect(
      mockQueryBuilder.insert().into(UserEntity).values(user).returning,
    ).toHaveBeenCalledWith("*");
  });
});

describe("find user or users", () => {
  const userId = "some-user-id";

  it("should call query function (find_user_by_id)", async () => {
    const postgresFunctionName = "find_user_by_id";
    (postgresTypeormStore.query as jest.Mock).mockReturnValue([mockUser]);

    await userRepository.findById(userId);
    expect(postgresTypeormStore.query).toBeCalledWith(
      `SELECT * FROM ${postgresFunctionName}($1)`,
      [userId],
    );
  });
});

describe("update user", () => {
  const userId = "user-id";
  const updatedUser = new UserEntity();

  it("should create a query builder", async () => {
    await userRepository.updateUser(userId, updatedUser);
    expect(postgresTypeormStore.createQueryBuilder).toHaveBeenCalled();
  });

  it("should pass query runner to query builder if provided", async () => {
    const queryRunner = postgresTypeormStore.createQueryRunner();
    await userRepository.updateUser(userId, updatedUser, { queryRunner });

    expect(postgresTypeormStore.createQueryBuilder).toHaveBeenCalled();
  });

  const mockQueryBuilder = postgresTypeormStore.createQueryBuilder();
  it("should call update function with UserEntity", async () => {
    await userRepository.updateUser(userId, updatedUser);
    expect(mockQueryBuilder.update).toHaveBeenCalledWith(UserEntity);
  });

  it("should call set function with updateUser", async () => {
    await userRepository.updateUser(userId, updatedUser);
    expect(mockQueryBuilder.update(UserEntity).set).toHaveBeenCalledWith(
      updatedUser,
    );
  });

  it("should call where function", async () => {
    await userRepository.updateUser(userId, updatedUser);
    expect(
      mockQueryBuilder.update(UserEntity).set(updatedUser).where,
    ).toHaveBeenCalled();
  });

  // Update does not return anything
  it("should not call returning function with *", async () => {
    await userRepository.updateUser(userId, updatedUser);
    expect(
      mockQueryBuilder
        .update(UserEntity)
        .set(updatedUser)
        .where("test-condition").returning,
    ).not.toHaveBeenCalledWith("*");
  });
});
