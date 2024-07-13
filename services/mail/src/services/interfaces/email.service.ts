import {
  ProjectMemberPayload,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";
import { ConfirmationEmailEntity } from "../../data/entities/confirmation-email.entity";

export interface EmailService {
  createInviteToken(payload: WorkspaceInvitePayload): string;
  sendUserEmailConfirmation(
    userEmailConfirmation: ConfirmationEmailEntity,
  ): Promise<void>;
  sendWorkspaceInvitation(payload: WorkspaceInvitePayload): Promise<void>;
  sendProjectInvitation(payload: ProjectMemberPayload): Promise<void>;
}
