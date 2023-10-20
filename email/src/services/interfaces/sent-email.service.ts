import {
  ServiceResponse,
  WorkspaceInvitePayload,
} from "@sourabhrawatcc/core-utils";
import { SentEmailEntity } from "../../data/entities/sent-emails.entity";

export interface SentEmailService {
  createSentEmail(receiverEmail: string): Promise<void>;
  createInviteToken(payload: WorkspaceInvitePayload): string;
  sendEmail(payload: WorkspaceInvitePayload): Promise<void>;
}
