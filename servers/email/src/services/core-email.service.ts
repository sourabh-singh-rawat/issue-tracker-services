import {
  JwtToken,
  MailService,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import { EmailEntity } from "../data/entities/email.entity";
import { EmailService } from "./interfaces/email.service";
import { EmailRepository } from "../data/repositories/interfaces/email.repository";

export class CoreEmailService implements EmailService {
  constructor(
    private readonly mailService: MailService,
    private readonly emailRepository: EmailRepository,
  ) {}

  createSentEmail = async (receiverEmail: string) => {
    const newSentEmail = new EmailEntity();
    newSentEmail.receiverEmail = receiverEmail;

    await this.emailRepository.save(newSentEmail);
  };

  createInviteToken = (payload: WorkspaceInvitePayload) => {
    return JwtToken.create(payload, process.env.JWT_SECRET!);
  };

  sendWorkspaceInvitation = async (payload: WorkspaceInvitePayload) => {
    await this.mailService.sendWorkspaceInvite(payload);
  };
}
