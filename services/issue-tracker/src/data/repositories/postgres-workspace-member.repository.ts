import { WorkspaceMember } from "../entities/WorkspaceMember";
import { Typeorm } from "@issue-tracker/orm";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { WorkspaceMemberRepository } from "./interfaces/workspace-member.repository";

export class PostgresWorkspaceMemberRepository
  implements WorkspaceMemberRepository
{
  constructor(private orm: Typeorm) {}

  save = async (workspace: WorkspaceMember, options?: QueryBuilderOptions) => {
    const query = this.orm
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(WorkspaceMember)
      .values(workspace)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceMember;
  };

  existsById = async (id: string) => {
    return await WorkspaceMember.exists({ where: { id } });
  };

  existsByEmail = async (email: string) => {
    return await WorkspaceMember.exists({ where: { email } });
  };

  existsByUserId = async (userId: string, workspaceId: string) => {
    return await WorkspaceMember.exists({
      where: { userId, workspaceId },
    });
  };

  find = async (workspaceId: string) => {
    const members = await WorkspaceMember.find({
      where: { workspaceId },
      relations: { user: true },
    });

    return members;
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
