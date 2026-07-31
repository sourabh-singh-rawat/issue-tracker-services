import { UserNotFoundError } from "@pine/common";
import { ProjectMemberData } from "@pine/events";
import { inject, injectable } from "inversify";
import { TYPES } from "@/bootstrap/container-types";
import type { IUserRepository } from "@/features/user";
import type { EmailMessage, IMailer } from "@/integrations/email";
import type { IProjectEmailService } from "./IProjectEmailService";

@injectable()
export class ProjectEmailService implements IProjectEmailService {
  private readonly senderEmail = "no-reply@issue-tracker.com";

  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
    @inject(TYPES.Mailer)
    private readonly mailer: IMailer,
  ) {}

  sendProjectInvitationEmail = async (payload: ProjectMemberData) => {
    const { projectId, role, createdBy } = payload;

    const sender = await this.userRepository.findById(createdBy);
    if (!sender) throw new UserNotFoundError();

    const message: EmailMessage = {
      title: `You are invited to join project by ${createdBy}`,
      html: `
        <strong>
          <p>You are invited to Project: ${projectId} by ${createdBy} for ${role} role</p>
        </strong>
        <a href="https://localhost/api/v1/projects/${projectId}/members/confirm?inviteToken=${"TODO: Token"}">
          Click to Accept Invite
        </a> 
      `,
    };
    this.mailer.send(this.senderEmail, "TODO: Email", message);
  };
}
