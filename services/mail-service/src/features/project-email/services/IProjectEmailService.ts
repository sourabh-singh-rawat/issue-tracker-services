import { ProjectMemberPayload } from "@pine/event-bus";

export interface IProjectEmailService {
  sendProjectInvitationEmail(payload: ProjectMemberPayload): Promise<void>;
}
