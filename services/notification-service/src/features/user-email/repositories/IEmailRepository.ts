import type { EmailStatus, EmailType } from "@pine/common";
import type { DbClient, Email } from "@/db";

export type EmailRepositoryOptions = { tx?: DbClient };

export type CreateEmailEntity = {
  id?: string;
  type: EmailType;
  email: string;
  status?: EmailStatus;
  html: string;
};

export type UpdateEmailEntity = {
  status?: EmailStatus;
  html?: string;
};

export interface IEmailRepository {
  save(entity: CreateEmailEntity, options?: EmailRepositoryOptions): Promise<Email>;
  update(id: string, entity: UpdateEmailEntity, options?: EmailRepositoryOptions): Promise<void>;
}
