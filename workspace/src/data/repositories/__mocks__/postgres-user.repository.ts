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

  findById = jest.fn().mockReturnValue(user);
  findByEmail = jest.fn().mockReturnValue(user);
  updateEmail = jest.fn().mockReturnValue(false);
  existsByEmail = jest.fn().mockReturnValue(true);
  updateUser = jest.fn().mockReturnValue(undefined);
  save = jest.fn().mockReturnValue({ id: "mocked-user-id" });
  existsById = jest.fn().mockReturnValue(true);

  softDelete(
    id: string,
    options?: QueryBuilderOptions | undefined,
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
