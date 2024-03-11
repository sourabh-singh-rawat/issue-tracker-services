import {
  PostgresTypeormStore,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberRepository } from "../interface/workspace-member";
import { WorkspaceMemberEntity } from "../../app/entities/workspace-member.entity";
import { UserEntity } from "../../app/entities";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private databaseService: PostgresTypeormStore) {}
  existsByUserId(userId: string, workspaceId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  find(id: string): Promise<WorkspaceMemberEntity[]> {
    throw new Error("Method not implemented.");
  }

  save = jest
    .fn()
    .mockImplementation(
      async (
        user: WorkspaceMemberEntity,
        options?: QueryBuilderOptions,
      ): Promise<WorkspaceMemberEntity> => {
        return user;
      },
    );

  existsById = jest
    .fn()
    .mockImplementation(async (id: string): Promise<boolean> => {
      throw new Error("Method not implemented.");
    });

  softDelete = jest
    .fn()
    .mockImplementation(
      async (id: string, options?: QueryBuilderOptions): Promise<void> => {
        throw new Error("Method not implemented.");
      },
    );
}
