import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { EmailVerificationToken } from "../../entities/email-verification-token.entity";

export interface EmailVerificationTokenRepository
  extends Repository<EmailVerificationToken> {
  findOne(id: string): Promise<EmailVerificationToken | null>;
  update(
    id: string,
    entity: EmailVerificationToken,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
