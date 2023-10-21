import { Repository } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../../entities/workspace-member.entity";

export interface WorkspaceMemberRepository
  extends Repository<WorkspaceMemberEntity> {
  existsByUserId(userId: string, workspaceId: string): Promise<boolean>;
}
