import { WorkspaceInvitation } from "../entities/WorkspaceInvitation";
import { QueryBuilderOptions } from "@issue-tracker/orm";
import { Typeorm } from "@issue-tracker/orm";
import { WorkspaceInviteTokenRepository } from "./interfaces/workspace-invite-token.repository";

export class PostgresWorkspaceInviteTokenRepository
  implements WorkspaceInviteTokenRepository
{
  constructor(private readonly orm: Typeorm) {}

  save = async (invite: WorkspaceInvitation, options?: QueryBuilderOptions) => {
    const query = this.orm
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(WorkspaceInvitation)
      .values(invite)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceInvitation;
  };

  existsById = async (id: string) => {
    return await WorkspaceInvitation.exists({ where: { id } });
  };

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
