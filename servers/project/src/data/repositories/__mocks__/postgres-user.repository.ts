import { TypeormStore } from "@sourabhrawatcc/core-utils";
import { UserRepository } from "../interfaces/user.repository";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly postgresTypeormStore: TypeormStore) {}

  save = jest.fn().mockReturnValue({ id: "user-id" });

  findById = jest.fn().mockReturnValue({ id: "user-id", version: 1 });

  existsById = jest.fn().mockReturnValue({ userExistsById: true });

  updateUser = jest.fn().mockReturnValue(undefined);

  softDelete = jest.fn().mockReturnValue(undefined);
}
