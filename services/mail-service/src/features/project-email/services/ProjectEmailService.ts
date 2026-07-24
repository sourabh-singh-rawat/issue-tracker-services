import { EmailMessage, Mailer } from "@pine/comm";
import { UserNotFoundError } from "@pine/common";
import { ProjectMemberPayload } from "@pine/event-bus";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import { User } from "@/entities";
import { IProjectEmailService } from "./IProjectEmailService";

@injectable()
export class ProjectEmailService implements IProjectEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";

  constructor(
    @inject(TYPES.Mailer)
    private readonly mailer: Mailer,
  ) {}

  sendProjectInvitationEmail = async (payload: ProjectMemberPayload) => {
    const { projectId, role, createdBy } = payload;

    const sender = await User.findOne({ where: { id: createdBy } });
    if (!sender) throw new UserNotFoundError();

    const message: EmailMessage = {
      title: `You are invited to join project by ${sender.displayName}`,
      html: `
        <strong>
          <p>You are invited to Project: ${projectId} by ${sender.displayName} for ${role} role</p>
        </strong>
        <a href="https://localhost/api/v1/projects/${projectId}/members/confirm?inviteToken=${"TODO: Token"}">
          Click to Accept Invite
        </a> 
      `,
    };
    this.mailer.send(this.senderEmail, "TODO: Email", message);
  };
}
