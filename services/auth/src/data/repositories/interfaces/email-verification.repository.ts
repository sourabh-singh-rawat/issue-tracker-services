import { QueryBuilderOptions, Repository } from "@issue-tracker/orm";
import { VerificationLink } from "../../entities/VerificationLink";

export interface EmailVerificationTokenRepository
  extends Repository<VerificationLink> {
  findOne(id: string): Promise<VerificationLink | null>;
  update(
    id: string,
    entity: VerificationLink,
    options?: QueryBuilderOptions,
  ): Promise<void>;
}
