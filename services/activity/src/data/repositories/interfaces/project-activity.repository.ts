import { Repository } from "@issue-tracker/orm";
import { ProjectActivityEntity } from "../../entities";

export interface ProjectActivityRepository
  extends Repository<ProjectActivityEntity> {
  findActivityByProjectId(id: string): Promise<ProjectActivityEntity[]>;
}
