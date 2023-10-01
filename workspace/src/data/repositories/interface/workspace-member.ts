import { Repository } from "@sourabhrawatcc/core-utils";
import { WorkspaceMemberEntity } from "../../entities/workspace-member.entity";

export interface WorkspaceMemberRepository
  extends Repository<WorkspaceMemberEntity> {}
