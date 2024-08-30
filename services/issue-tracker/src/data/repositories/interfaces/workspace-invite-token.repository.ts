import { Repository } from "@issue-tracker/orm";
import { WorkspaceInviteTokenEntity } from "../../entities/workspace-invite-token.entity";

export interface WorkspaceInviteTokenRepository
  extends Repository<WorkspaceInviteTokenEntity> {}
