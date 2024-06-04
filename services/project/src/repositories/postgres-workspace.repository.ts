import { Typeorm } from "@issue-tracker/orm";
import { WorkspaceEntity } from "../app/entities";
import { WorkspaceRepository } from "./interfaces/workspace.repository";
import { QueryBuilderOptions } from "@issue-tracker/orm";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  constructor(private readonly orm: Typeorm) {}

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

  existsById = async () => {
    throw new Error("Method not implemented.");
  };

  softDelete = async () => {
    throw new Error("Method not implemented.");
  };
}
