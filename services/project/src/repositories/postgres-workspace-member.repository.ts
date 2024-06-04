import { Typeorm } from "@issue-tracker/orm";
import { WorkspaceMemberEntity } from "../app/entities/workspace-member.entity";
import { WorkspaceMemberRepository } from "./interfaces/workspace-member.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (
    member: WorkspaceMemberEntity,
    options?: QueryBuilderOptions,
  ) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(WorkspaceMemberEntity)
      .values(member)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceMemberEntity;
  };

  existsById(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  find = async (projectId: string, workspaceId: string) => {
    return await WorkspaceMemberEntity.find({ where: { workspaceId } });
  };

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
