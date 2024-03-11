import { Repository } from "@sourabhrawatcc/core-utils";
import { ProjectActivityEntity } from "../../app/entities";

export interface ProjectActivityRepository
  extends Repository<ProjectActivityEntity> {
  findActivityByProjectId(id: string): Promise<ProjectActivityEntity[]>;
}
