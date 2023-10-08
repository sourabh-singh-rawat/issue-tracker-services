import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "./interface/workspace-member";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private databaseService: DatabaseService) {}

  save = async (
    entity: WorkspaceMemberEntity,
    options?: QueryBuilderOptions | undefined,
  ): Promise<WorkspaceMemberEntity> => {
    const { userId, workspaceId } = entity;

    const query = this.databaseService
      .createQueryBuilder(WorkspaceMemberEntity, "wm", options?.queryRunner)
      .insert()
      .into(WorkspaceMemberEntity)
      .values({ userId, workspaceId })
      .returning(["userId", "workspaceId"]);

    return (await query.execute()).generatedMaps[0] as WorkspaceMemberEntity;
  };

  existsById = async (id: string): Promise<boolean> => {
    throw new Error("Method not implemented.");
  };

  softDelete = async (
    id: string,
    options?: QueryBuilderOptions | undefined,
  ): Promise<void> => {
    throw new Error("Method not implemented.");
  };
}
