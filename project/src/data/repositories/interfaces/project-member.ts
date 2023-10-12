import { Repository } from "@sourabhrawatcc/core-utils";
import { ProjectMemberEntity } from "../../entities";

export interface ProjectMemberRepository
  extends Repository<ProjectMemberEntity> {
  findByProjectId(projectId: string): Promise<ProjectMemberEntity[]>;
}
