import {
  DatabaseService,
  QueryBuilderOptions,
} from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberInviteEntity } from "../entities/workspace-member-invite.entity";
import { WorkspaceMemberInviteRepository } from "./interface/workspace-member-invite.repository";

export class PostgresWorkspaceMemberInviteRepository
  implements WorkspaceMemberInviteRepository
{
  constructor(private readonly databaseService: DatabaseService) {}

  save = async (
    invite: WorkspaceMemberInviteEntity,
    options?: QueryBuilderOptions,
  ) => {
    const query = this.databaseService
      .createQueryBuilder(options?.queryRunner)
      .insert()
      .into(WorkspaceMemberInviteEntity)
      .values(invite)
      .returning("*");

    return (await query.execute())
      .generatedMaps[0] as WorkspaceMemberInviteEntity;
  };

  existsById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
