import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { UserEntity } from "../../entities";
import { UserRepository } from "../interface/user-repository";

const user = new UserEntity();
user.id = "user-id";
user.version = 1;

export class PostgresUserRepository implements UserRepository {
  constructor(private databaseService: DatabaseService) {}

  findById = jest.fn().mockImplementation((userId: string) =>
    [
      { id: userId, version: 1 },
      { id: userId + " 2", version: 1 },
    ].find(({ id }) => id === userId),
  );
  findByEmail = jest.fn().mockReturnValue(user);
  updateEmail = jest.fn().mockReturnValue(false);
  updateUser = jest.fn().mockReturnValue(undefined);
  save = jest.fn().mockReturnValue({ id: "mocked-user-id" });
  existsByEmail = jest.fn().mockImplementation((email: string) => {
    const emails = ["user-id-1", "user-id-2"];

    return { id: "user-id-1", version: 1 };
  });
  existsById = jest.fn().mockImplementation((userId: string) => {
    const userIds = ["user-id-1", "user-id-2"];

    return Boolean(userIds.find((id) => id === userId));
  });

  softDelete(
    id: string,
    options?: QueryBuilderOptions | undefined,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
