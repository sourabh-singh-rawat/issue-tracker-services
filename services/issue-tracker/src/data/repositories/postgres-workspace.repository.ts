import { WorkspaceRepository } from "./interface/workspace-repository";
import { WorkspaceEntity } from "../entities";
import { QueryBuilderOptions, Typeorm } from "@issue-tracker/orm";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  constructor(private orm: Typeorm) {}

  save = async (workspace: WorkspaceEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(WorkspaceEntity)
      .values(workspace)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as WorkspaceEntity;
  };

  existsById = async (id: string) => {
    return await WorkspaceEntity.exists({ where: { id } });
  };

  findById = async (id: string) => {
    return await WorkspaceEntity.findOne({ where: { id } });
  };

  find = async (userId: string) => {
    return await WorkspaceEntity.find({ where: { ownerUserId: userId } });
  };

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
