import { Repository } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../../entities/workspace-member.entity";
import { UserEntity } from "../../entities";

export interface WorkspaceMemberRepository
  extends Repository<WorkspaceMemberEntity> {
  find(projectId: string, workspaceId: string): Promise<UserEntity[]>;
}
