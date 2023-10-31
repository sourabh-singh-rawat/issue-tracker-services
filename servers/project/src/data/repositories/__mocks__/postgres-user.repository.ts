import { DatabaseService } from "@sourabhrawatcc/core-utils";
import { ProjectEntity } from "../../entities";
import { UserRepository } from "../interfaces/user.repository";

export class PostgresUserRepository implements UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  save = jest.fn().mockReturnValue({ id: "user-id" });

  findById = jest.fn().mockReturnValue({ id: "user-id", version: 1 });

  existsById = jest.fn().mockReturnValue({ user_exists_by_id: true });

  updateUser = jest.fn().mockReturnValue(undefined);

  softDelete = jest.fn().mockReturnValue(undefined);
}
