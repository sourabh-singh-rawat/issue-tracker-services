import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { EmailVerificationTokenEntity } from "../../entities/email-verification-token.entity";

export interface EmailVerificationTokenRepository
  extends Repository<EmailVerificationTokenEntity> {
  findOne(id: string): Promise<EmailVerificationTokenEntity | null>;
  update(
    id: string,
    entity: EmailVerificationTokenEntity,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
