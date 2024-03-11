import { TypeormStore, QueryBuilderOptions } from "@sourabhrawatcc/core-utils";
import { WorkspaceEntity } from "../app/entities";
import { WorkspaceRepository } from "./interfaces/workspace.repository";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  constructor(private readonly store: TypeormStore) {}

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
    throw new Error("Method not implemented.");
  };

  softDelete = async (id: string, options?: QueryBuilderOptions) => {
    throw new Error("Method not implemented.");
  };
}
