import {
  JwtToken,
  MailService,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import { SentEmailEntity } from "../data/entities/sent-emails.entity";
import { SentEmailService } from "./interfaces/sent-email.service";
import { SentEmailRepository } from "../data/repositories/interfaces/sent-email.repository";

export class CoreSentEmailService implements SentEmailService {
  constructor(
    private readonly sentEmailRepository: SentEmailRepository,
    private readonly mailService: MailService,
  ) {}

  createSentEmail = async (receiverEmail: string) => {
    const newSentEmail = new SentEmailEntity();
    newSentEmail.receiverEmail = receiverEmail;

    await this.sentEmailRepository.save(newSentEmail);
  };

  createInviteToken = (payload: WorkspaceInvitePayload) => {
    return JwtToken.create(payload, process.env.JWT_SECRET!);
  };

  sendEmail = async (payload: WorkspaceInvitePayload) => {
    const { senderEmail, senderName, receiverEmail } = payload;
    // should connect with smtp server
    this.mailService.setSender(senderEmail, senderName);
    await this.mailService.sentWorkspaceInvite(receiverEmail);
  };
}
