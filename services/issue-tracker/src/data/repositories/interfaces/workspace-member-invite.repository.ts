import { Repository } from "@issue-tracker/orm";
import { WorkspaceMemberInviteEntity } from "../../entities/workspace-member-invite.entity";

export interface WorkspaceMemberInviteRepository
  extends Repository<WorkspaceMemberInviteEntity> {}
