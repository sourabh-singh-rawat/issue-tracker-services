import { ProjectMemberData } from "@pine/events";

export interface IProjectEmailService {
  sendProjectInvitationEmail(payload: ProjectMemberData): Promise<void>;
}
