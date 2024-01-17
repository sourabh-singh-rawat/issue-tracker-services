import { TypeormStore } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberRepository } from "../interfaces/workspace-member.repository";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private readonly postgresTypeormStore: TypeormStore) {}

  save = jest.fn().mockReturnValue({ id: "workspace-id" });

  existsById = jest.fn().mockReturnValue({ userExistsById: true });

  find = jest.fn().mockReturnValue([{ id: "user-id" }]);

  softDelete = jest.fn().mockReturnValue(undefined);
}
