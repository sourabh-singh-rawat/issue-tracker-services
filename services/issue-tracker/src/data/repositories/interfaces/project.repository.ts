import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { Filters } from "@issue-tracker/common";
import { List } from "../../entities";

export interface ProjectRepository extends Repository<List> {
  find(userId: string, workspaceId: string, filters: Filters): Promise<List[]>;
  findOne(id: string): Promise<List | null>;
  findCount(userId: string, workspaceId: string): Promise<number>;
  update(
    id: string,
    updatedProject: List,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
