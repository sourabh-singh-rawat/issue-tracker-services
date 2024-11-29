import { QueryBuilderOptions, Typeorm } from "@issue-tracker/orm";
import { Workspace } from "../entities/Workspace";
import { WorkspaceRepository } from "./interfaces/workspace.repository";

export class PostgresWorkspaceRepository implements WorkspaceRepository {
  constructor(private orm: Typeorm) {}

  save = async (workspace: Workspace, options?: QueryBuilderOptions) => {
    const queryRunner = options?.queryRunner;
    const query = this.orm
      .createQueryBuilder(queryRunner)
      .insert()
      .into(Workspace)
      .values(workspace)
      .returning("*");

    return (await query.execute()).generatedMaps[0] as Workspace;
  };

  existsById = async (id: string) => {
    return await Workspace.exists({ where: { id } });
  };

  findById = async (id: string) => {
    return await Workspace.findOne({ where: { id } });
  };

  findByUserId = async (userId: string) => {
    return await Workspace.find({ where: { createdById: userId } });
  };

  find = async (userId: string) => {
    return await Workspace.find({ where: { createdById: userId } });
  };

  softDelete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
