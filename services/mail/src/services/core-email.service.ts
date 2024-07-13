import { EmailMessage, Mailer } from "@issue-tracker/comm";
import { EmailEntity } from "../data/entities/email.entity";
import { EmailService } from "./interfaces/email.service";
import { UserRepository } from "../data/repositories/interfaces/user.repository";
import { EmailRepository } from "../data/repositories/interfaces/email.repository";
import {
  ProjectMemberPayload,
  WorkspaceInvitePayload,
} from "@issue-tracker/event-bus";
import { NotFoundError } from "@issue-tracker/common";
import { JwtToken } from "@issue-tracker/security";
import { ConfirmationEmailEntity } from "../data/entities/confirmation-email.entity";

export class CoreEmailService implements EmailService {
  constructor(
    private readonly mailer: Mailer,
    private readonly userRepository: UserRepository,
    private readonly emailRepository: EmailRepository,
  ) {}

  createEmail = async (receiverEmail: string) => {
    const newSentEmail = new EmailEntity();
    newSentEmail.receiverEmail = receiverEmail;

    await this.emailRepository.save(newSentEmail);
  };

  createInviteToken = <T>(payload: T) => {
    return JwtToken.create(payload, process.env.JWT_SECRET!);
  };

  sendUserEmailConfirmation = async (
    userEmailConfirmation: ConfirmationEmailEntity,
  ) => {
    if (!userEmailConfirmation) {
      throw new NotFoundError("User confirmation email not found");
    }

    const { userId } = userEmailConfirmation;

    const email = userEmailConfirmation.emailAddress;
    const token = userEmailConfirmation.emailVerificationToken;
    const message: EmailMessage = {
      title: "Please confirm your email",
      html: `
        <strong>
          <p>Please click this <a href="https://localhost:4001/api/v1/auth/users/${userId}/confirm?confirmationEmail=${token}">link</a> to confirm your email </p>
        </strong>
      `,
    };

    await this.mailer.send("noreply@issue-tracker.com", email, message);
  };

  sendWorkspaceInvitation = async (payload: WorkspaceInvitePayload) => {
    const { senderEmail, receiverEmail, senderName, workspaceId } = payload;
    const token = this.createInviteToken(payload);
    const message: EmailMessage = {
      title: `You are invited to join workspace by ${senderName}`,
      html: `
        <strong>
          <p>You are invited to Workspace: ${workspaceId} by ${senderName}</p>
        </strong>
        <a href="https://localhost/api/v1/workspaces/${workspaceId}/invite/confirm?inviteToken=${token}">
          Click to Accept Invite
        </a> 
      `,
    };

    await this.mailer.send(senderEmail, receiverEmail, message);
    await this.createEmail(receiverEmail);
  };

  sendProjectInvitation = async (payload: ProjectMemberPayload) => {
    const { userId, projectId, role, createdBy } = payload;

    const receiver = await this.userRepository.findById(userId);
    const sender = await this.userRepository.findById(createdBy);

    if (!receiver) throw new Error("No receiver found");
    if (!sender) throw new Error("Sender not found");

    const token = this.createInviteToken(payload);
    const message: EmailMessage = {
      title: `You are invited to join project by ${sender.displayName}`,
      html: `
      <strong>
        <p>You are invited to Project: ${projectId} by ${sender.displayName} for ${role} role</p>
      </strong>
      <a href="https://localhost/api/v1/projects/${projectId}/members/confirm?inviteToken=${token}">
        Click to Accept Invite
      </a> 
    `,
    };
    await this.mailer.send(sender.email, receiver.email, message);
    await this.createEmail(receiver.email);
  };
}
