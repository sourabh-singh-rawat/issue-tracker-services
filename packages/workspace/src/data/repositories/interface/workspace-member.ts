import { Repository } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../../entities/workspace-member.entity";
import { UserEntity } from "../../entities";

export interface WorkspaceMemberRepository
  extends Repository<WorkspaceMemberEntity> {
  existsByUserId(userId: string, workspaceId: string): Promise<boolean>;
  find(id: string): Promise<UserEntity[]>;
}
