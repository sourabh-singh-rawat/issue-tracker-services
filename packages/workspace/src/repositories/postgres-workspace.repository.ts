import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceRepository } from "./interface/workspace-repository";
import { WorkspaceEntity } from "../app/entities";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  constructor(private store: TypeormStore) {}

  save = async (workspace: WorkspaceEntity, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.store
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

  softDelete(id: string, options?: QueryBuilderOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
