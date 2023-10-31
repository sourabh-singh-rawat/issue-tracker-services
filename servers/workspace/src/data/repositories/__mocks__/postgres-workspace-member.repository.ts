import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../../entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "../interface/workspace-member";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private databaseService: DatabaseService) {}

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
